import Control from "./Control";
import  Sensors from './Sensors'

export default class Car{

    constructor(x,y,width,height){

        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed=0;
        this.accelaration=0.3;
        this.maxSpeed=3;
        this.angle=0;
      
        this.control=new Control();
        this.sensors=new Sensors(this)
    }
      update(){
    
      this.#move();
      this.sensors.showRays();//borders
    
    }
    #move(){
       
        if(this.control.forward) this.speed+=this.accelaration;
        if(this.control.reverse) this.speed-=this.accelaration;

        let flip=1;
        if(this.speed<0) flip=-1;

         if(this.control.left) this.angle-=0.03*flip;
         if(this.control.right) this.angle+=0.03*flip;
                                 
    
        if(this.speed>this.maxSpeed) this.speed=this.maxSpeed;
        if(this.speed<-this.maxSpeed/2) this.speed= -this.maxSpeed/2;

         this.y-=Math.cos(this.angle)*this.speed;
         this.x+=Math.sin(this.angle)*this.speed;
             

    }

    draw(ctx){
      
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);
        ctx.rect(
             -this.width/2,
             -this.height/2,
              this.width,
              this.height
        );
        ctx.fillStyle="blue"
        ctx.fill();
        ctx.restore();
               this.sensors.draw(ctx);

        
    }

}