
import Utils from './Utils'
export default class Sensors{

    constructor(car){

     this.car=car;
     this.rayCount=4;
     this.rayLength=170;
     this.raySpread=Math.PI/2;

     this.rays=[];
     this.utils=new Utils();
     this.readings=[];

    }

    update(borders){

        this.rays=[];
        this.#showRays();
         this.readings=[];// an array of intersection of min intersection for each ray.
         for(let i=0;i<this.rays.length;i++){

this.readings.push(
            this.#getReadings(this.rays[i],borders)
                                                   );

         }

          console.log("READING"+this.readings);

    }

// all possible intesections for each ray
    #getReadings(rays,borders){

        let touches=[]; 

          for(let i=0;i<borders.length;i++){

        const intersection=this.utils.getIntersection(
                rays[0], //start of ray
                rays[1], // end of ray
                borders[i][0],
                borders[i][1]
              );
         
         if(intersection!=null) touches.push(intersection);
   
          }

          if(touches.length==0) return null;
          else{
            const offSetArray=touches.map(e=>e.offSet);
            const minOffSet=Math.min(...offSetArray);
            console.log("MIN OFFSET "+minOffSet );
            return touches.find(e=>e.offSet==minOffSet);
          }

    }



    #showRays(){
        
      this.rays=[];
       for(let i=0;i<this.rayCount;i++){

        const rayAngle=this.utils.lerp(this.raySpread/2,-this.raySpread/2,i/(this.rayCount-1))-this.car.angle;
        const start={x:this.car.x,y:this.car.y};
        const end={x:this.car.x+Math.sin(rayAngle)* this.rayLength,
                   y:this.car.y-Math.cos(rayAngle)*this.rayLength}
                    this.rays.push([start,end]);
                                   }
      
       }

    draw(ctx){

        for(let i=0;i<this.rayCount;i++){

            let end=this.rays[i][1];

            if(this.readings[i])  end=this.readings[i];
            
    
        ctx.beginPath();
        ctx.lineWidth=2;
        ctx.strokeStyle="green";
        ctx.moveTo(this.rays[i][0].x,this.rays[i][0].y);
        ctx.lineTo(end.x,end.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth=2;
        ctx.strokeStyle="red";
        ctx.moveTo(this.rays[i][1].x,this.rays[i][1].y);
        ctx.lineTo(end.x,end.y);
        ctx.stroke();

        }

    }
    }




      

