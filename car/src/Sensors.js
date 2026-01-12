
import Utils from './Utils'
export default class Sensors{

    constructor(car){

     this.car=car;
     this.rayCount=4;
     this.rayLength=120;
     this.raySpread=Math.PI/2;

     this.rays=[];
     this.utils=new Utils();

    }

    showRays(){
      this.rays=[];
       for(let i=0;i<this.rayCount;i++){

        const rayAngle=this.utils.lerp(this.raySpread/2,-this.raySpread/2,i/(this.rayCount-1))+this.car.angle;
        const start={x:this.car.x,y:this.car.y};
        const end={x:this.car.x+Math.sin(rayAngle)* this.rayLength,
                   y:this.car.y-Math.cos(rayAngle)*this.rayLength}

                    this.rays.push([start,end]);
                                   }

      
       }

    draw(ctx){

        for(let i=0;i<this.rayCount;i++){
    
        ctx.beginPath();
        ctx.lineWidth=2;
        ctx.strokeStyle="green";
        ctx.moveTo(this.rays[i][0].x,this.rays[i][0].y);
        ctx.lineTo(this.rays[i][1].x,this.rays[i][1].y);
        ctx.stroke();

        }

    }
    }




      

