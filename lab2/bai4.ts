enum Role { ADMIN, READ_ONLY, AUTHOR }
const person: {
    name: string;
    age: number;
    hobbies: string[];          
    role: Role;           
    roletuple: [number, string]; 
} = {
    name: "Max",
    age: 30,
    hobbies: ["Sport", "Cooking"],
    role: Role.AUTHOR,
    roletuple: [2, "author"],
};

let favouriteActivities: any[];
favouriteActivities = [5, "Sport", true];

if (person.role === Role.AUTHOR) {
    console.log("is author");
}

person.roletuple.push("admin"); 

console.log(person);
