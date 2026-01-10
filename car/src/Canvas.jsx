import { useRef,useEffect } from 'react'
import './Canvas.css'
import Car from "./Car.js"
const Canvas =()=>{

    const canvasRef=useRef(null);
    


useEffect(()=>{

    const canvas=canvasRef.current;
    const roadDiv=canvas.parentElement;
    canvas.height=roadDiv.clientHeight;
    canvas.width=roadDiv.clientWidth; 

    const ctx=canvas.getContext("2d");
    const car=new Car(100,100,30,50);

    function animate(){
    ctx.clearRect(0,0,canvas.height,canvas.width);
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