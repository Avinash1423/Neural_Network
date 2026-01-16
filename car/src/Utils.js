    
 export default class Utils{

    constructor(){ }
   
   lerp(left,right,p){

         return left+(right-left)*p;
   }

   getIntersection(A,B,C,D){

     const tTop=(C.x-A.x)*(D.y-C.y)-(C.y-A.y)*(D.x-C.x)
     const uTop=(C.x-A.x)*(B.y-A.y)-(C.y-A.y)*(B.x-A.x)
     const bottom=(B.x-A.x)*(D.y-C.y)-(B.y-A.y)*(D.x-C.x)

    if(bottom!=0){

      const t=tTop/ bottom;
      const u=uTop/bottom;

      if( t>=0  && t<=1 &&  u>=0 && u<=1){
          return {
                  x:this.lerp(A.x,B.x,t),
                  y:this.lerp(A.y,B.y,t),
                  offSet:t
                  }
              
      }
    }

    return null;
   }

      polyIntersect(poly1,poly2){ // car,road   // car ,car

           for(let i=0;i<poly1.length;i++){

              for(let j=0;j<poly2.length;j++){

                     const touch=this.getIntersection(
                        poly1[i],
                        poly1[(i+1)%poly1.length],
                        poly2[j],
                        poly2[(j+1)%poly2.length]

                                                );

                            if(touch){
                               return true;

                                                  }
              }

           }

           return false;


   }
}