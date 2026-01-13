import { useRef,useEffect } from 'react'
import './Canvas.css'
import Car from "./Car.js"
import Road from "./Road.js"

const Canvas =()=>{

    const canvasRef=useRef(null);
    
useEffect(()=>{

    const canvas=canvasRef.current;
    const roadDiv=canvas.parentElement;
    canvas.height=roadDiv.clientHeight;
    canvas.width=roadDiv.clientWidth; 

    const ctx=canvas.getContext("2d");
    const  road=new Road(canvas.width/2,canvas.width,3);
    const car=new Car(road.getLaneCenter(1),100,35,50);
 
    function animate(){  
    
    ctx.clearRect(0,0,canvas.width,canvas.height);  

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);// start drawing from this point so at every new frame
                                               // its looks like the car is here
    road.draw(ctx);
    car.update(road.border);
    car.draw(ctx);
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
</div>

<div className='neural'>

</div>



</div>
);

}

export default Canvas