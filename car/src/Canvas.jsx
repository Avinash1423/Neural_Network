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
    ctx.clearRect(0,0,canvas.width,canvas.height,);  
    road.draw(ctx);
    car.move();
    car.draw(ctx);
   
    requestAnimationFrame(animate);
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