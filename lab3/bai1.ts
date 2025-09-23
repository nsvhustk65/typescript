
//1. Viết hàm (function và arrow function) tính tổng có giá trị trả về không dùng tham số.
function tinhTong(){
    let a =5
    let b =10
    let tong = a+b
    return tong
}
console.log(tinhTong());


const tinhTongArrow = () => {
    let x = 7;
    let y = 3;
    return x + y;
};

console.log(tinhTongArrow());

//Viết hàm arrow function tính tổng 2 số (có sử dụng default value, optional parameter, rest parameter)

const sumDefault = (a:number =5,b:number=10):number=>{
    return a+b
};
console.log(sumDefault());

const sumOptional =(a:number, b?:number)=>{
    if(b===undefined){
        return a
    }
    return a+b
}
console.log(sumOptional(1,2));



const sumRest = (...numbers: number[]): number => {
  return numbers.reduce((total, num) => total + num, 0);
};

console.log(sumRest(1, 2));

//3. array
const hobbies:string[] = ['Sports','Cooking']
const activehobbies:string[] =['Hiking']
// activehobbies.push(hobbies)
// activehobbies.push(hobbies[0],hobbies[1])
activehobbies.push(...hobbies)
console.log(activehobbies);
