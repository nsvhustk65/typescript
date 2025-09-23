let useInput:unknown;
let useName: string;

useInput =5;
useInput ="TypeScript";
// useName = useInput;
useName =<string> useInput;
if(typeof useInput==='string'){
    useName=useInput
}