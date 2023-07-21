// const name = 'Max';
// let age = 29;
// const hasHobbies = true;
// age = 30;

// const summarizeUser = (userName, userAge, userHasHobby) => {
//     return `Name is ${userName}, age is ${userAge} and the user has hobbies: ${userHasHobby}`;
// }

// const add = (a, b) => a + b;
// const addRandom = () => 1 + 2;

// console.log(add(1, 2))
// console.log(addRandom())
// console.log(summarizeUser(name, age, hasHobbies))

// ----------------------------

// const person = {
//     name: 'Max',
//     age: 29,
//     greet() {
//         console.log(`Hi I am ${this.name}`)
//     }
// }
// console.log(person)
// person.greet()

// const hobbies = ['Sports', 'Cooking'];
// // for (let hobby of hobbies) {
// //     console.log(hobby)
// // }
// console.log(hobbies.map(hobby => "Hobby: " + hobby))
// console.log(hobbies);
// hobbies.push('programming');
// console.log(hobbies);
// console.log(hobbies.slice().concat(['test']))
// const copied = [...hobbies];
// console.log(copied);

// const toArray = (...args) => {
//     return args;
// };
// console.log(toArray(1, 2, 3));

// const printName = ({ name }) => {
//     console.log(name);
// }
// printName(person)

// const [hobby1, hobby2] = hobbies;
// console.log(hobby1, hobby2)

// ------------------------

const fetchData = () => {
    const promise = new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve('Done');
            }, 1500);
        }
    )

    return promise;
};

setTimeout( () => {
    console.log('Timer is done');
    fetchData().then(text => {
        console.log(text);
        return fetchData();
    }).then(text2 => {
        console.log(text2);
    })
}, 3000)

console.log('hello');
console.log('hi');