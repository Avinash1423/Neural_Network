import { useRef,useEffect } from 'react'
import './Canvas.css'
import Car from "./Car.js"
import Road from "./Road.js"
import Visualizer from './Visualizer.js'
import NeuralNetwork from './Level.js'


const Canvas =()=>{
    
    const canvasRef=useRef(null);
    const  neuralCanvasRef=useRef(null);
    

 let bestCar = null;

    const save = () => {
        if (!bestCar) return;
        localStorage.setItem(
            "bestNeural",
            JSON.stringify(bestCar.neural)
        );
      //  console.log("SAVED "+JSON.stringify(bestCar.neural));
    };

    const unSave = () => {
          if (!bestCar) return;
        if(localStorage.getItem("bestNeural")){
        localStorage.removeItem("bestNeural");
       //  console.log("DELETED" + JSON.stringify(bestCar.neural));
        }
     else  console.log("NOTING TO DELETE");
    };
    

  
useEffect(()=>{

    const canvas=canvasRef.current;
    const roadDiv=canvas.parentElement;
    canvas.height=roadDiv.clientHeight;
    canvas.width=roadDiv.clientWidth; 

    const neuralCanvas=neuralCanvasRef.current;
    const neuralDiv=neuralCanvas.parentElement;
    neuralCanvas.height=neuralDiv.clientHeight;
    neuralCanvas.width=neuralDiv.clientWidth;

    const ctx=canvas.getContext("2d");
    const neuralCtx=neuralCanvas.getContext("2d");
    const  road=new Road(canvas.width/2,canvas.width,3);
     
// #1 car
 //   const car=new Car(road.getLaneCenter(1),100,35,50,false);

   const N=1000;
   const multipleCars=generateCars(N);
   function generateCars(N){
       const carsFromGenerateCars=[];

        for(let i=0;i<N;i++){
         
          carsFromGenerateCars.push(new Car(road.getLaneCenter(1),100,35,50,false));

        }

           return carsFromGenerateCars;
    }

      bestCar=multipleCars[0];

     if(localStorage.getItem("bestNeural")){
             
      for(let i=0;i<multipleCars.length;i++){

            multipleCars[i].neural=JSON.parse(localStorage.getItem("bestNeural"));
             if(i!=0){
            NeuralNetwork.mutate(multipleCars[i].neural,0.4);
         }

      }
        

     

     }

     

    const traffic=[
        new Car(road.getLaneCenter(0),-100,35,50,true),
        new Car(road.getLaneCenter(2),-250,35,50,true),
        new Car(road.getLaneCenter(0),-450,35,50,true),
        new Car(road.getLaneCenter(1),-650,35,50,true),
        new Car(road.getLaneCenter(0),-850,35,50,true),
        new Car(road.getLaneCenter(2),-1050,35,50,true),
       
    ];

    function animate(){ 

        
        //**fitness function that rewards the algorithm for being having the furtherest x value */
         bestCar=multipleCars.find( c=>c.y==Math.min(...multipleCars.map(c=>c.y)));
        
    ctx.clearRect(0,0,canvas.width,canvas.height);  

    ctx.save();
    ctx.translate(0,-bestCar.y+canvas.height*0.7);// start drawing from this point so at every new frame
                                               // its looks like the car is here
    road.draw(ctx);

     for(let i=0;i<multipleCars.length;i++){

      multipleCars[i].update(road.border,traffic);

     }

    for(let i=0;i<traffic.length;i++){
      
        traffic[i].update(road.border,[]);
        traffic[i].draw(ctx);
    }

    ctx.globalAlpha=0.1;
    
    for(let i=0;i<multipleCars.length;i++){

         multipleCars[i].draw(ctx);
    }

      ctx.globalAlpha=1;

    bestCar.draw(ctx,true);

    

    Visualizer.drawNetwork(neuralCtx,bestCar.neural);
    ctx.restore();
   
    requestAnimationFrame(animate);//this is async
    }

     animate();

},[])

return(

    <div className='main'>
<div className='track'>
    <div className='road'>
  <canvas ref={canvasRef}></canvas>
    </div>

    <div>
        <button className="save" onClick={save}>Save </button>
         <button className="unSave"  onClick={unSave}>Delete </button>
    </div>
</div>

 

<div className='neural'>

 <canvas ref={neuralCanvasRef}></canvas>

</div>

</div>
);
}

export default Canvas