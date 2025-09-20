const chieudai =10;
const chierong = 5;
function chuvi(chieudai:number, chieurong:number):number{
    return 2*(chieudai +chierong)
};
console.log(`Chu vi hình chữ nhật là: ${chuvi(chieudai, chierong)}`);


//Viết 1 hàm tính tổng nhiều số (không biết trước số lượng tham số), sử dụng rest parameter

function sum(numbers:number[]):number {
    return numbers.reduce((total,num)=>total+num,0)
}
console.log(sum([1,2,3]));


//Viết hàm trả về số lượng xuất hiện của 1 kí tự trong chuỗi

function countText(str:string,char:string):number{
    let count = 0;
    for (let i =0;i<str.length;i++){
        if(str[i]===char){
            count++
        }
    }
    return count
}
console.log(countText("hello world", "o"));

//Viết hàm trả về boolean kiểm tra 1 số có phải số nguyên tố

function checkNumber(num: number): boolean {
  if (num < 2) return false;
  if (num === 2) return true;  
  if (num % 2 === 0) return false;

  const sqrt = Math.sqrt(num);
  for (let i = 3; i <= sqrt; i += 2) { 
    if (num % i === 0) return false;
  }
  return true;
}

console.log(checkNumber(4)); 
