//funciton va void

let sum = (x:number=5, y?:number)=>{
    return x+<number>y;
}

let speech = (output:any):void =>{
    console.log("Resualt:"+output);
    
}
speech(sum(5,12))
console.log(speech(sum(8,5)));

//never va void
let something :void =undefined;
// let nothing :never = null
function throwError(errorMsg:string):never{
    throw new Error(errorMsg)
}

//function va callback
function AddandHandle(x:number,y:number,cb:(num:number)=>void){
    const result = x+y;
    cb(result)
}
AddandHandle(10,20,(result)=>{console.log(result);
})

