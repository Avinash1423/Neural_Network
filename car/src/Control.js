export default class Control{

    constructor(){
      
        this.forward=false;
        this.reverse=false;
        this.right=false;
        this.left=false;

        this.#addKeyBoardListner();
    }


    #addKeyBoardListner(){

        document.onkeydown=(e)=>{

             if(e.key=="ArrowLeft") this.left=true;
             if(e.key=="ArrowRight") this.right=true;
             if(e.key=="ArrowDown") this.reverse=true;
             if(e.key=="ArrowUp") this.forward=true;

        }

         document.onkeyup=(e)=>{

            if(e.key=="ArrowLeft") this.left=false;
             if(e.key=="ArrowRight") this.right=false;
             if(e.key=="ArrowDown") this.reverse=false;
             if(e.key=="ArrowUp") this.forward=false;
        }

    }
}