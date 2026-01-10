import Control from "./Control";

export default class Car{

    constructor(x,y,width,height){

        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed=0;
        this.accelaration=0.3
        this.maxSpeed=3;
   

        this.control=new Control();
    }


    move(){

        if(this.control.forward) this.speed+=this.accelaration;
        if(this.control.reverse) this.speed-=this.accelaration;

        
        if(this.speed>this.maxSpeed) this.speed=this.maxSpeed;
        if(this.speed<-this.maxSpeed/2) this.speed= -this.maxSpeed/2;

           this.y-=this.speed;

        if(this.control.left) this.x-=2;
        if(this.control.right) this.x+=2; 
    }


    draw(ctx){
      
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x,this.y);
        ctx.rect(
             -this.width/2,
             -this.height/2,
              this.width,
              this.height
        );
        ctx.fill();
        ctx.restore();

    }

}