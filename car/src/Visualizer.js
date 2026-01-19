import Utils from "./Utils";

export default class Visualizer{

    static drawNetwork(ctx,network){

        const margin=50;
        const left=margin;
        const top=margin;
        const width=ctx.canvas.width-(margin*2);
        const height=ctx.canvas.height-(margin*2);
        this.utils=new Utils();

        const levelHeight= height/network.level.length;

          let levelTop=top;
        
        for(let i=network.level.length-1;i>=0;i--){

         Visualizer.drawLevel(network.level[i],left,levelTop,width,levelHeight,ctx);
         levelTop +=levelHeight;

        }
    }

    static drawLevel(level,left,top,width,height,ctx){
               
           const right=left+width;
           const bottom=top+height;

        const radius=18;

         const{inputs,outputs,weights,biases}=level;

          // draw the connections for this level

             for(let i=inputs.length-1;i>=0;i--){

                    const xFrom=this.utils.lerp(
                    left,
                    right,
                    (inputs.length==1) ? 0.5 : i/(inputs.length-1));

             for(let j=outputs.length-1;j>=0;j--){
                    
                        const xTo=this.utils.lerp(
                        left,
                        right,
                        (outputs.length==1) ? 0.5 : j/(outputs.length-1));
                    ctx.beginPath();
                    ctx.strokeStyle=this.utils.getRGBA(weights[i][j]);
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
            (inputs.length==1) ? 0.5 : i/(inputs.length-1)

          );
          ctx.beginPath();
          ctx.arc(x,bottom,radius*0.6,0,Math.PI*2);
          ctx.fillStyle=this.utils.getRGBA(inputs[i])
          ctx.fill();
          }
        
        // draw the ouput nodes of this level  
         for(let i=outputs.length-1;i>=0;i--){

            const x=this.utils.lerp(
            left,
            right,
            (outputs.length==1) ? 0.5 : i/(outputs.length-1)

          );

          ctx.beginPath();
          ctx.arc(x,top,radius,0,Math.PI*2);
          ctx.fillStyle="black";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x,top,radius*0.6,0,Math.PI*2);
          ctx.fillStyle=this.utils.getRGBA(outputs[i])
          ctx.fill();

           ctx.beginPath();
           ctx.lineWidth =2;
           ctx.arc(x,top,radius*0.8,0,Math.PI*2);
           ctx.strokeStyle=this.utils.getRGBA(biases[i]);
           ctx.setLineDash([4,4])
           ctx.stroke();
           ctx.setLineDash([]);


          }

              }

          

  
   }
