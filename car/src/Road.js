
import Utils from './Utils.js'
export default class Road{

     constructor(x,width,laneCount=3){

        this.x=x;
        this.width=width;
        this.laneCount=laneCount;
        this.left=this.x-this.width/2*0.9;
        this.right=this.x+this.width/2*0.9;
        this.top=-1000000;
        this.bottom=1000000;
        this.utils=new Utils();

     }
   
     draw(ctx){
        
        ctx.save();
        ctx.linewidth=10;
        ctx.strokeStyle="white";

        for(let i=0;i<=this.laneCount;i++){

         const x=this.utils.lerp(this.left,this.right,i/this.laneCount);

         if(i>0 &&i<this.laneCount) ctx.setLineDash([20,20]);
         else
         ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(x,this.top);
        ctx.lineTo(x,this.bottom);
        ctx.stroke();
      //  ctx.restore();
     
        }

     }

     getLaneCenter(laneIndex){

      const laneWidth=this.width/this.laneCount;
      return this.left+(laneIndex*laneWidth)+laneWidth/2;
     }


    
   
}

 
