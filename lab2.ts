// //number,string,boolean
// let number1 :number =5;
// let number2 :number =2;
// let phrase :string ='Result is';
// let permit: boolean = true;

// const result = number1 +number2;
// if(permit){
//     console.log(phrase+ result); 
// }
// else{
//     console.log('Not show result');  
// }

// //type inference
// function add( x=5){
//     let phrase='Result is'
//     phrase ='2.8'
//     return phrase + x;
// }
// let result:number = add();
// //object
// var person:{
//     name:string,
//     age:number
// }
// person ={
//     name:'TypeScript',
//     age:11
// }
// console.log(person.name);

// //array,tuple,any,enum
// enum Role{ADMIN, READ_ONLY, AUTHOR}
// const person:{
//     name:string,
//     age:number,
//     hobbies:['Sport','Cooking'],
//     role:string,
//     roletuple:[number,string]
// }
// let favoutiteActivites :any[];
// favoutiteActivites = [5,'Sport',true];

// if(person.role===Role.AUTHOR){
//     console.log('is author');
    
// }
// person.roletuple.push('admin');
// person.roletuple[1]=10;
// person.roletuple = [0,'admin','user']

// //