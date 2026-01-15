import Control from "./Control";
import  Sensors from './Sensors'
import Utils from "./Utils"

export default class Car{

    constructor(x,y,width,height,dummy){
       
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.dummy=dummy;
        this.speed=0;
        this.accelaration=0.3;
        this.maxSpeed= (!this.dummy) ? 5 : 3;
        this.angle=0;
    
        this.points=[];
        this.damage=false;
        this.utils=new Utils();
       
        this.control=new Control(this.dummy);
        if(!this.dummy)  this.sensors=new Sensors(this);

    }
      update(border){

    
      if(!this.damage){
         this.#move();
         this.polygon=this.#getCoridnates(); // cordinates of the car for collision detection
         this.damage = this.#assesDamage(border); //assess damage

       if(!this.dummy){

    
        this.sensors.update(border);//borders

       }

        }

        
    }
    #assesDamage(border){

        for(let i=0;i<border.length;i++){

            if(this.utils.polyIntersect(this.polygon,border[i])) return true;

         //  console.log(this.utils.polyIntersect(this.polygon,border[i]));
        }

        return false;

    }

    #getCoridnates(){
     this.points=[];
     
     const rad=(Math.hypot(this.width,this.height))/2;
     const alpha=Math.atan2(this.width,this.height);

     // Top Left
     this.points.push(
        {
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        }
            )

     // Top Right
     this.points.push(
        {
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        }
                 )

      // Bottom Right
     this.points.push(
        {
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        }
  
                 )

     // Bottom Left
     this.points.push(
        {
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        }
        
              )
     
           return this.points;
    }
    #move(){

       
       
        if(this.control.forward) this.speed+=this.accelaration;
        if(this.control.reverse) this.speed-=this.accelaration;

        let flip=1;
        if(this.speed<0) flip=-1;

         if(this.control.left) this.angle+=0.03*flip;
         if(this.control.right) this.angle-=0.03*flip;
                                 

        if(this.speed>this.maxSpeed) this.speed=this.maxSpeed;
        if(this.speed<-this.maxSpeed/2) this.speed= -this.maxSpeed/2;

         this.y-=Math.cos(this.angle)*this.speed;
         this.x-=Math.sin(this.angle)*this.speed;

        
             
    }

    draw(ctx){
      
        if(!this.dummy){
       ctx.fillStyle= (!this.damage) ? "blue" : "grey"
        }
        else{
             ctx.fillStyle="red"
        }
        
       ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i=1;i< this.polygon.length;i++){

            ctx.lineTo(this.polygon[i].x, this.polygon[i].y)
        }

       
        ctx.fill();

        if(!this.dummy){
        this.sensors.draw(ctx);
        }
        //  ctx.save();
        // ctx.beginPath();
        // ctx.translate(this.x,this.y);
        // ctx.rotate(this.angle);
        // ctx.rect(
        //      -this.width/2,
        //      -this.height/2,
        //       this.width,
        //       this.height
        // );
        // ctx.fillStyle="blue"
        // ctx.fill();
        // ctx.restore();
        //        this.sensors.draw(ctx);

            
        
    }

}