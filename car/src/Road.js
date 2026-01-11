
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

        // record left and right most border in array

        const topRight={x:this.right,y:this.top};
        const topLeft={x:this.left,y:this.top};
        const bottomRight={x:this.right,y:this.bottom};
        const bottomLeft={x:this.left,y:this.bottom};

        this.border=[
         [topLeft,bottomLeft],
         [topRight,bottomRight]
        ]

     }
   
     draw(ctx){
        
        ctx.save();
        ctx.linewidth=10;
        ctx.strokeStyle="white";

        // diplay inner dashed borders
        for(let i=1;i<this.laneCount;i++){

        const x=this.utils.lerp(this.left,this.right,i/this.laneCount);

        ctx.setLineDash([20,20]);
      
        ctx.beginPath();
        ctx.moveTo(x,this.top);
        ctx.lineTo(x,this.bottom);
        ctx.stroke();
    
        }

       // diplay outer  most borders
         ctx.setLineDash([]);
       
         this.border.forEach(border=>{
          ctx.beginPath();
          ctx.moveTo(border[0].x,border[0].y);
          ctx.lineTo(border[1].x,border[1].y)
          ctx.stroke();
           
         }
       )

        ctx.restore();
     }

     getLaneCenter(laneIndex){

      const laneWidth=this.width/this.laneCount;
      return this.left+(laneIndex*laneWidth)+laneWidth/2;
     }


    
   
}

 
