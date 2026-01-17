

export default class NeuralNetwork{

    constructor(neuronCounts){ // 4 6 4

        this.level=[];
        for(let i=0;i<neuronCounts.length-1;i++){

            this.level.push(
               new Level(neuronCounts[i],neuronCounts[i+1]) // 4 6
            );
        
        }
    }
   

        static feedForward(givenInput,network){

        let outputs=Level.feedForward(givenInput,network.level[0]);//returns an array of outputs

         for(let j=1;j<network.level.length;j++){

              outputs=Level.feedForward(outputs,network.level[j]);

            }

            return outputs;
        }

    

}



class Level{

    constructor(inputCount,outputCount){

        this.inputs=new Array(inputCount); //4
        this.outputs=new Array(outputCount);  // 6
        this.biases=new Array(outputCount)   // 4

        this.weights=[];//an array of array (inputs*outputs) /24

        //each input node has a weight for every output node

        for(let i=0;i<inputCount;i++){
          
       this.weights[i]=new Array(outputCount);

        }

             Level.#randomize(this) // initialize the weights and biases with values between -1 and 1
    }
     
     static #randomize(level){ 

        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;j<level.outputs.length;j++){
                level.weights[i][j]=Math.random()*2-1;
            }
        }

        for(let i=0;i<level.biases.length;i++){
            level.biases[i]=Math.random()*2-1;
        }
    }

    static feedForward(givenInput,level){

        for(let i=0;i<level.inputs.length;i++){
                   
           level.inputs[i]=givenInput[i];

        }

          
        for(let i=0;i<level.outputs.length;i++){ //output
     let sum=0;
                for(let j=0;j<level.inputs.length;j++){ //input
                     
                  sum +=level.inputs[j]*level.weights[j][i];   
                

                          }

        if(sum>level.biases[i])  level.outputs[i]=1;
        else
            level.outputs[i]=0;

        
        }

       

        return level.outputs;
    }


   }    