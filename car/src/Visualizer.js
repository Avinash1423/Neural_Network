import Utils from "./Utils";

export default class Visualizer{

    static drawNetwork(ctx,network){

        const margin=50;
        const left=margin;
        const top=margin;
        const width=ctx.canvas.width-(margin*2);
        const height=ctx.canvas.height-(margin*2);
        this.utils=new Utils();

        Visualizer.drawLevel(network.level[0],left,top,width,height,ctx);
    }

    static drawLevel(level,left,top,width,height,ctx){
               
           const right=left+width;
           const bottom=top+height;

        const radius=18;

         const{inputs,outputs}=level;

          // draw the connections for this level

             for(let i=inputs.length-1;i>=0;i--){

                    const xFrom=this.utils.lerp(
                    left,
                    right,
                    (level.inputs.length==1) ? 0.5 : i/inputs.length);

             for(let j=outputs.length-1;j>=0;j--){
                    
                        const xTo=this.utils.lerp(
                        left,
                        right,
                        (level.outputs.length==1) ? 0.5 : j/outputs.length);
                    
                    ctx.strokeStyle="orange";
                    ctx.lineWidth=2
                    ctx.moveTo(xFrom,bottom);
                    ctx.lineTo(xTo,top);
                    ctx.stroke();

                 }
                     }

                             // draw the input nodes of this level

        for(let i=inputs.length-1;i>=0;i--){

           const x=this.utils.lerp(
            left,
            right,
            (level.inputs.length==1) ? 0.5 : i/inputs.length

          );
          ctx.beginPath();
          ctx.arc(x,bottom,radius,0,Math.PI*2);
          ctx.fillStyle="white";
          ctx.fill();
          }
        
        // draw the ouput nodes of this level  
         for(let i=outputs.length-1;i>=0;i--){

            const x=this.utils.lerp(
            left,
            right,
            (level.outputs.length==1) ? 0.5 : i/outputs.length

          );
          ctx.beginPath();
          ctx.arc(x,top,radius,0,Math.PI*2);
          ctx.fillStyle="white";
          ctx.fill();
          }

    
              }

  
   }
