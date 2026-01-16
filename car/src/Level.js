
export default class Level{

    constructor(inputCount,outputCount){

        this.inputs=new Array(inputCount);
        this.outputs=new Array(outputCount);
        this.biases=new Array(outputCount)

        this.weights=[];//an array of array (inputs*outputs)

        //each input node has a weight for every output node

        for(let i=0;i<this.inputs;i++){
          
            this.weights[i]=new Array(outputCount);

        }

             Level.#randomize(this) // initialize the weights and biases with values between -1 and 1
    }
     
     static #randomize(level){ 

            for(let i=0;i<level.inputs.length;i++){
                for(let j=0;j<level.outputs.length;i++){

                    weights[i][j]=Math.random()*2-1;

            }

             for(let i=0;i<level.outputs.length;i++){

                   this.biases[i]=Math.random()*2-1;
                
                            }
                        
                        }
                    }

    static feedForward(givenInput,level){

        for(let i=0;i<level.inputs.length;i++){
                   
                  level.inputs[i]=givenInput[i];

        }

          
        for(let i=0;i<level.outputs.length;i++){ //output

                for(let j=0;j<level.inputs.length;j++){ //input
                          sum=0;
                  sum +=level.inputs[j]*level.weights[j][i];   
                

                          }

        if(sum>level.biases[i])  level.outputs[i]=1;
        else
            level.outputs[i]=0;
         
        
        }

       

        return level.outputs;
    }


   }    