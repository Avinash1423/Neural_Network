
import Utils from './Utils'
export default class Sensors{

    constructor(car){

     this.car=car;
     this.rayCount=5;
     this.rayLength=150;
     this.raySpread=Math.PI/2;

     this.rays=[];
     this.utils=new Utils();
     this.readings=[];

    }

    update(borders,traffic){

        this.rays=[];
        this.#showRays();
         this.readings=[];// an array of intersection of min intersection for each ray.
         for(let i=0;i<this.rays.length;i++){

      this.readings.push(
            this.#getReadings(this.rays[i],borders,traffic)
                                                   );
         }

        
    }

// all possible intesections for each ray
    #getReadings(rays,borders,traffic){
      
        let touches=[]; 
        //

         for(let i=0;i<traffic.length;i++){

          for(let j=0;j<traffic[i].polygon.length;j++){

        const intersection=this.utils.getIntersection(
                rays[0], //start of ray
                rays[1], // end of ray
                traffic[i].polygon[j], // cordinate of car
                traffic[i].polygon[(j+1)%traffic[i].polygon.length] //cordinate of car
              );
         
         if(intersection!=null) touches.push(intersection);
   
          }
        }

//

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




      

