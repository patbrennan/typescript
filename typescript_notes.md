# TypeScript Notes - Udemy Course

### What is TypeScript?

A strongly-typed superset of JavaScript; a wrapper. It doesn't run in the browser. It compiles to Js.

### Why? How?

We can use strong-typing, which will throw errors / lint when we are introducing a bug that would otherwise throw silently. This is just one of the many features of TypeScript. Ex: See [TypeScript playground](https://www.typescriptlang.org/play/index.html)

### Installation:

If you have node installed, you can use `npm` to install it with `npm -g install typescript`, which will install the latest version.

### Using TypeScript & Environment setup:

1. In your project folder, you will have "file.ts" files.
2. In your html or reference file that will load the compiles javascript, you will reference *not* the ".ts" file, but the same name w/".js".
3. In your terminal, run `tsc filename.ts` to compile the file to JavaScript ES5.
4. In order to enable live reload of your files when changes are made, run `npm install lite-server --save-dev`.
5. Your `package.json` file should be modified as such:

```javascript
{
  "name": "typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "lite-server" // <= add this line
  },
  "author": "",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {
    "lite-server": "^2.3.0"
  }
}
```

6. Then run `npm start` from the cli to visit your live web server.
7. TO make compilation easier, run `tsc --init`. This puts the folder under control of npm, but also put it under control of typescript. This creates a `tsconfig.json` file, which tells typescript that the folder is a typescript folder, and running `tsc` will compile *ALL* typescript files.
8. Now you can run `tsc` to compile all ".ts" files.

## Types in TypeScript

The types we have in Ts:

```javascript
// Strings
let myName = "Max"; // Ts recognizes type
myname = 28;        // throws error in Ts - Type 'number' not assignable to type 'string'

// number
let myAge = 32;
let yourAge = 26.55; // also a valid number as a float. Ts doesn't care.

// boolean
let hasHobbies = true;
hasHobbies = 1;        // Still throws error even though 1 could evaluate true

// assign types
let realAge;    // Ts assigns type as "any"
realAge = 32.5;
realAge = "32.5";

let anotherAge: number; // Ts will throw error when trying to reassign as diff type.
let name: string = "Patrick";

// array
let hobbies = ["flying", "coding", "gym"];
console.log(typeof hobbies); // Object
hobbies = [100];  // Ts ERROR: array of nums not assignable to arr of strings.

let hobbies: any[] = ["flying", "coding", "gym"]; // Set type to any
hobbies = [100]; // Ts will NOT throw error now; it's still an array (object)
hobbies = 100;   // Ts WILL throw error because it's not the same object type!

// tuples
// just arrays w/mixed types & limited num of items. The order is important:
let address: [string, number] = ["Streetname", 333];

// enums
enum Color {
  Gray,   // 0
  Green,  // 1
  Purple = 50, // 50
  Blue,   // 51 - continues w/number previously defined
}
let favColor: Color = Color.Green;
console.log(favColor); // logs 1. Numbers are assigned automatically.

// any - Try to avoid! Be explicit where possible.
let car: any = "BMW";
car =  { brand: "BMW", series: "3" }; // No Ts error.
```

### Types in Functions

```javascript
// functions
let myName = "Patrick"

function returnMyName(): string { // refers to return value only, not args
  return myName;
  // return myAge;    // Ts would throw error
}

console.log(returnMyName());

// void

function sayHello(): void {   // void = nothing. Ts throws error if you DO try to
  console.log("Hello!");      // return something.
}

// argument types
function multiply(val1, val2): number {
  return val1 * val2;
}

console.log(multiply(2, "Hello")); // No error...just gives NaN

// instead, do:
function multiply(val1: number, val2: number): number { // WILL throw an error
  return val1 * val2;
}
```

### Functions as Types

```javascript
// function types
let myMultiply;
myMultiply = sayHello;  // setting to the function itself
myMultiply(); // "Hello!
myMultiply = multiply;
console.log(myMultiply(2, 2)); // 4

// What if we only wanted a specific type of function to be able to be assigned?

// indicates it's a type function, args & types, & return. Basic setup would just be:
// let myMultiply: () => ;
let myMultiply: (val1: number, val2: number) => number;

myMultiply = sayHello;  // setting to the function itself
myMultiply(); // Ts ERROR not assignable
myMultiply = multiply; // satisfies conditions for Ts
console.log(myMultiply(2, 2)); // 4
```

It's important to note that order of arguments is important, but names of the arguments are not.

### Objects & Types

```javascript
// objects
let userDate = {    // Ts infers the type w/the fields & their types.
  name: "Patrick",
  age: 32,
};
userData = {}; // Running `tsc` in CLI throws error that it's not assignable


let userDate: { name: string, age: number } = { // explicity set types as blueprint
  name: "Patrick",
  age: 32,
};
```

Names of properties are important as well, and mismatches throw errors. Order is not important (unlike functions), but names are.

### Putting it together in complex objects:

```javascript
// Object w/two properties. first is array of numbers, second a function
let complex: {data: number[], output: (all: boolean) => number[]} = {
  data: [100, 3.99, 10],

  output: function (all: boolean): number[] {
    return this.data;
  },
};
```

### Custom types w/Aliases

This creates an issue when we have large, complex objects. Normally we'd have to copy everything & then edit everything in multiple places. We can store types, however.

```javascript
// type alias
type Complex = {data: number[], output: (all: boolean) => number[]}; // setup

let complex2: Complex = { // specify the alias name
  data: [100, 3.99, 10],

  output: function (all: boolean): number[] {
    return this.data;
  },
};
```

### Allow multiple types w/Union Types

This allows us to take functionality & properties from on type & then modify only certain properties or add additional ones to it.

```javascript
// union types

// Example: we want to allow a string or number representation of a number:
// set as type number OR string, but nothing else.
let myRealRealAge: number | string = 27;
myRealRealAge = "27"; // does not throw error.
myRealRealAge = true; // DOES throw error when running tsc in CLI
```

### Checking types

```javascript
let finalValue = "A String!";

if (typeof finalValue === "number") {
  console.log("Final value is a number!");
};
```

### "never" type in Ts 2.0:

A function is "never" returning anything. This is where you might specify this type to make your intentions clear. If you go there, then it never returns - you can use this in your code.

```javascript
// never
function neverReturns(): never { // Ts would auto infer function that never returns
  throw new Error("WHAAAAT?");
};
```

### "nullable" types in Ts 2.0

Assigning or "resetting" a variable to a `null` value is common, but might cause some subtle bugs if you later try to use that variable in the program. You can specify in Ts values that should NEVER or MAY be `null`.

To modify your program's behavior, you would go into `tsconfig.json` & under `compileOptions`, set `strictNullChecks` to `true` or `false`. By default, it is `false` so your code still works. All variables are allowed to be `null` by default.

```javascript
// nullable types
let canBeNull = 12; // Ts inferred to be number.
canBeNull = null;   // If `strictNullChecks` set `true`, Ts throws error.

let canAlsoBeNull;    // Ts infers type as "any". Value is `undefined`.
canAlsoBeNull = null; // works.
```

What if you specifically want to allow one variable to reassignable to `null`?

```javascript
let canBeNull: number | null = 12;
canBeNull = null; // works.

let canThisBeAny = null;  // Infers type "nullable".
canThisBeAny = 12; // Ts throws error. Ts inferred `canThisBeAny` to be of type "null"
```

#### Practice:

Convert the following code to include TypeScript types:

```javascript
let bankAccount = {
    money: 2000,
    deposit(value) {
        this.money += value;
    }
};

let myself = {
    name: "Max",
    bankAccount: bankAccount,
    hobbies: ["Sports", "Cooking"]
};

myself.bankAccount.deposit(3000);

console.log(myself);
```

Solution:

```javascript
type BankAccount = { money: number, deposit: (value: number) => void };

let bankAccount: BankAccount = {
    money: 2000,
    deposit(value: number): void {
        this.money += value;
    }
};

let myself: { name: string, bankAccount: BankAccount, hobbies: string[] } = {
    name: "Max",
    bankAccount: bankAccount,
    hobbies: ["Sports", "Cooking"]
};

myself.bankAccount.deposit(3000);

console.log(myself);
```

## Other Ts Features

### Project Configuration: using tsconfig.json:

You can configure how your compiler behaves in your `tsconfig.json` file. Some options are below, but you can see specific article how-to's in the documentation on the Ts website.

```javascript
// tsconfig.json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",
    "module": "commonjs",
    "noImplicitAny": false,     // true = Ts errors if implicit 'any' types exist
    "sourceMap": false,         // true = creates app.js.map, which allows debugging
                                // in chrome dev tools
    "noEmitError": false,       // will not compile the js file if there are any errors
    "strictNullChecks": true,   // throws error when null values may exist
    "noUnusedParameters": true, // Ts error if declared but not used function params
  },
  "exclude": [
    "node_modules"
  ]
```

### ES6 Changes available in Ts

> **NOTE**: To find current compatibility between Ts & ES6 features, check out [this table](http://kangax.github.io/compat-table/es6/)

```javascript
// let & const
var something = 25;   // creates global scope variable
let varName = "Test"; // creates block-scoped variable
const maxLevel = 100; // creates a constant that can't be changed & throws error

// block scope
let variable = "thing";

function reset() {
  let variable = null;  // scoped to this block
  console.log(variable);
  // console.log(maxLevel); Would throw error; maxLevel not defined
}
reset();                // null
console.log(variable);  // "thing"


// arrow functions
const addNumbers = function(num1: number, num2: number): number {
  return num1 + num2;
};
console.log(addNumbers(10, 3)); // 13...how lucky

const multiplyNumbers = (num1: number, num2: number) => {
  return num1 * num2;
};
console.log(multiplyNumbers(10, 3)); // 30

// variations of arrow functions
const greet = () => console.log("Hello"); // no brackets req'd if on one line
greet(); // Hello

const greetFriend = friend => console.log(friend); // no parens req'd if one variable

// function & default params
const countDown = (start: number=10): void => { // set default to 10
  while (start > 0) {
    start--;
  }
  console.log("Done!", start);
};
countDown(10); // Done 0
countDown();   // Done 0

// rest & spread operator
// allow us to work w/arrays & lists of data
const numbers = [1, 10, 99, -5];
console.log(Math.max(33, 99, 10, -3)); // 99
console.log(Math.max(numbers));       // expects list of numbers

// SPREAD
console.log(Math.max(...numbers));    // 99; works. turns array into list of values

// REST
// make sure to specify the correct data type
// specify individual args first before any that should be combined into array
function makeArray(name: string, ...args: number[]) { // same as spread; creates array
  return args;
};
console.log(makeArray(1, 2, 3)); // [1, 2, 3]

// Destructuring

// ARRAYS
const myHobbies = ["Cooking", "Sports"];
const [hobby1, hobby2] = myHobbies; // creates constants & assigns based on position
console.log(hobby1, hobby2);  // Cooking Sports

// OBJECTS
const userData = {
  userName: "PBB",
  age: 32,
};
const {userName, age} = userData; // names must match keys in the object
console.log(userName, age);  // PBB 32

const {userName: myName, age: myAge} = userData;  // can no longer use userName & age
console.log(myName, myAge);  // PBB 32

// Template literals
const username = "Patrick";
const greeting = `Hey there, ${username}`;  // use backtick character.
const otherGreeting = `---> HEADING:
You are logged in as ${username}.
Welcome.`;                                  // works with multiline
console.log(greeting); // Hey there, Patrick;
```

### Excercise: ES6-ify this code:

```javascript
// Exercise 1
var double = function(value) {
    return value * 2;
};
console.log(double(10));

// Exercise 2
var greet = function (name) {
    if (name === undefined) { name = "Max"; }
    console.log("Hello, " + name);
};
greet();
greet("Anna");

// Exercise 3
var numbers = [-3, 33, 38, 5];
console.log(Math.min.apply(Math, numbers));

// Exercise 4
var newArray = [55, 20];
Array.prototype.push.apply(newArray, numbers);
console.log(newArray);

// Exercise 5
var testResults = [3.89, 2.99, 1.38];
var result1 = testResults[0];
var result2 = testResults[1];
var result3 = testResults[2];
console.log(result1, result2, result3);

// Exercise 6
var scientist = {firstName: "Will", experience: 12};
var firstName = scientist.firstName;
var experience = scientist.experience;
console.log(firstName, experience);
```

Solution:

```javascript
// Exercise 1
const double = (value: number) => value * 2;
console.log(double(10));

// Exercise 2 - arrow functions & default values
const greet = (name: string="Max") => console.log(`Hello, ${name}`);
greet();
greet("Anna");

// Exercise 3 - spread operator
const numbers: number[] = [-3, 33, 38, 5];
console.log(Math.min(...numbers));

// Exercise 4 - spread operator
let newArray: number[] = [55, 20];
newArray.push(...numbers);
console.log(newArray);

// Exercise 5 - destructuring arrays
const testResults: number[] = [3.89, 2.99, 1.38];
const [result1, result2, result3] = testResults;
console.log(result1, result2, result3);

// Exercise 6 - destructuring objects
const scientist = {firstName: "Will", experience: 12};
const {firstName, experience} = scientist;
console.log(firstName, experience);
// alernatively, use aliases:
const {firstName: first, experience: exp} = scientist;
console.log(first, exp);
```

## Using Classes to Create Objects

```javascript
class Person {
  name: string; // default property is public (accessible from outside)
  private type: string; // only accessible from within this object
  protected age: number;  // also accessible from objects that inherit from this class

  // using `public` in constructor function w/ arguments automatically creates
  // property in the class & assigns the value it gets from constructor function.
  constructor(name: string, public username: string) {
    this.name = name;
    // this.username = username; <= automatically happens w/syntax in const def
  }
}

const pat = new Person("Patrick", "pbb");
console.log(pat); // Person {username: "pbb", name: "Patrick"}

pat.age;  // not accessible
pat.type; // not accessible
```

### Class Methods & Access Modifiers

```javascript
class Person {
  name: string;
  private type: string; t
  protected age: number = 32; // can initialize & set here.

  constructor(name: string, public username: string) {
    this.name = name;
  }

  printAge() {
    console.log(this.age);  // accessible from inside
  }

  setType(type: string) {
    this.type = type;
    console.log(this.type);
  }

  protected sayHi() {       // methods can also be protected or private
    return `Hello, ${this.name}`;
  }
}

const pat = new Person("Patrick", "pbb");
pat.printAge(); // 32
pat.setType("Cool Dude");
pat.sayHi(); // won't work - is protected
```

### Inheritance

```javascript
// ...code from above
// We want to create a more specific type of Person
class Patrick extends Person { // Either extends or overwrites Person class code.
  name = "Patrick";
}
const newPat = new Patrick("Broseph", "pbb"); // still requires 2 args from superclass
console.log(newPat); // {name: "Patrick", username: "pbb"}
```

Note how name is still "Patrick" even though the superclass sets the name. The `name` property is overwritten in the subclass.

### Inheritance & Constructors

```javascript
class Patrick extends Person { // Either extends or overwrites Person class code.
  name = "Patrick";

  constructor(username: string) {
    super(this.name, username); // MUST be called if you define constructor explicitly
  }
}
const newPat = new Patrick("pbb"); // no longer requires both arguments; only username
```

What if you wanted to change the age of the `newPat` object? It's protected in the `Person` superclass. Use `this.age`. since protected properties & methods can be accessed by subclasses. Remember, it's `private` that makes it only available INSIDE that class definition.

```javascript
class Patrick extends Person { // Either extends or overwrites Person class code.
  name = "Patrick";

  constructor(username: string) {
    super(this.name, username); // MUST be called if you define constructor explicitly
    this.age = 33;  // protected, so it is accessible
    // console.log(this.type) // <= undefined; no access to this
  }
}
const newPat = new Patrick("pbb"); // no longer requires both arguments; only username
```

### Getters & Setters

Normally we wouldn't prefix something with an underscore, but in this case, it allows us to differentiate in our code the actual property vs. a method call for a getter & setter:

```javascript
class Plan {
  private _species: string = "Default";

  get species() {
    return this._species; // do something
  }

  set species(value: string) {  // like a method, but call it like property
    if (value.length > 3) {
      this._species = value;
    } else {
      this._species = "Default";
    }
  }
}

let plant = new Plant();
console.log(plant.species); // Default <= note it's called like property, not func
plant.species = "AB";
console.log(plant.species); // Default; logic did not set it.
plant.species = "Furr";
console.log(plant.species); // Furr
```

### Static Properties & Methods

You may have a need to create a class or use a constant in a class elsewhere in your program. That's where `static` in TypeScript comes in.

```javascript
class Helpers {
  // may always use property even if you don't instantiate the class w/`static`
  static PI: number = 3.14;
  static calcCircumference(diamter: number): number {
    return this.PI * diameter;
  }
}
// these now work:
console.log(2 * Helpers.PI);
console.log(Helpers.calcCircumference(8));
```

### Abstract Classes

You ALWAYS have to inherit from abstract classes. They can't be instantiated. Maybe they just provide basic setup for other specialized classes.

```javascript
abstract class Project {
  projectName: string = "Default";
  budget: number;

  calcBudget() {
    return this.budget * 2; // or whatever
  }

  // only define how the function is structed w/abstract:
  abstract changeName(name: string): void; // write the logic in child class
}

class ITProject extends Project {
  // must implement changeName method in here or Ts will throw error
  changeName(name: string): void {
    this.projectName = name;
  }
}

let myProj = new ITProject();
console.log(myProj); // {projectName: "Default", budget: 1000}
myProj.changeName("Super IT Project");
console.log(myProj); // {projectName: "Super IT Project", budget: 1000}
```

### Private Constructors & Singletons

This is a singleton class, where you only want to have ONE instance during runtime.

```javascript
class OnlyOne {
  private static instance: OnlyOne; // returns self

  private constructor(public name: string) {}   // forces use as singleton

  // checks if it's already been instantiated.
  static getInstance() {
    if (!OnlyOne.instance) {
      OnlyOne.instance = new OnlyOne("The Only One");
    }
    return OnlyOne.instance;
  }
}

let wrong = new OnlyOne("The Only One"); // Ts throws error
let right = OnlyOne.getInstance(); // only way to instantiate instance & returns it.
console.log(right.name); // this works since name is public property
right.name = "Something Else"; // setting also works - but you may not want that
```

But what if we wanted to only be able to set the `name` property from within the constructor, and not from outside, yet still make it readable?

One way is to ONLY specify a getter. Another Ts shortcut is to specify `readonly` as a keyword after public, so the constructor function above would read:

`private constructor(public readonly name: string) {}`

### Exercise: Re-write using Ts & class features

```javascript
// Exercise 1 - How was your TypeScript Class?
function Car(name) {
    this.name = name;
    this.acceleration = 0;

    this.honk = function() {
        console.log("Toooooooooot!");
    };

    this.accelerate = function(speed) {
        this.acceleration = this.acceleration + speed;
    }
}
var car = new Car("BMW");
car.honk();
console.log(car.acceleration);
car.accelerate(10);
console.log(car.acceleration);

// Exercise 2 - Two objects, based on each other ...
var baseObject = {
    width: 0,
    length: 0
};
var rectangle = Object.create(baseObject);
rectangle.width = 5;
rectangle.length = 2;
rectangle.calcSize = function() {
    return this.width * this.length;
};
console.log(rectangle.calcSize());

// Exercise 3 - Make sure to compile to ES5 (set the target in tsconfig.json)
var person = {
    _firstName: ""
};
Object.defineProperty(person, "firstName", {
    get: function () {
        return this._firstName;
    },
    set: function (value) {
        if (value.length > 3) {
            this._firstName = value;
        }
        else {
            this._firstName = "";
        }
    },
    enumerable: true,
    configurable: true
});
console.log(person.firstName);
person.firstName = "Ma";
console.log(person.firstName);
person.firstName = "Maximilian";
console.log(person.firstName);
```

SOLUTION:

```javascript
// Exercise 1 - How was your TypeScript Class?
class Car {
  acceleration: number = 0;

  constructor(public name: string) {}

  honk() {
    console.log("Toooooooooot!");
  }

  accelerate(speed: number): void {
    this.acceleration = this.acceleration + speed;
  }
}
let car = new Car("BMW");
car.honk();
console.log(car.acceleration);
car.accelerate(10);
console.log(car.acceleration);

// Exercise 2 - Two objects, based on each other ...
class BaseObject {
  width: number = 0;
  height: number = 0;
}

class Rectangle extends BaseObject {
  calcSize() {
    return this.width * this.length;
  }
}

let rectangle = new Rectangle();
rectangle.width = 5;
rectangle.height = 10;
console.log(rectangle.calcSize()); // 50

// Exercise 3 - Make sure to compile to ES5 (set the target in tsconfig.json)
var person = {
    _firstName: ""
};
Object.defineProperty(person, "firstName", {
    get: function () {
        return this._firstName;
    },
    set: function (value) {
        if (value.length > 3) {
            this._firstName = value;
        }
        else {
            this._firstName = "";
        }
    },
    enumerable: true,
    configurable: true
});

class Person {
  private _firstName: string = "Default";

  get firstName() {
    return this._firstName;
  }

  set firstName(value: string) {
    if (value.length > 3) {
      this._firstName = value;
    } else {
      this._firstName = "Default";
    }
  }
}

console.log(person.firstName);
person.firstName = "Ma";
console.log(person.firstName);  // empty string
person.firstName = "Maximilian";
console.log(person.firstName);
```

> **NOTE**: When specifying a single file to compile w/Ts, like `tsc filename.ts`, you may not have some features available unless you compile to the correct ES version, since using `tsc` with single files doesn't reference the `tsconfig.json` file. Therefore, specify the version: `tsc filename.ts -t ES5`.

## Namespaces

Ts supports modular code so you can split your project into logical files.

### Namespaces

Why would we need namespaces? Namespaces help us prevent from having clashing function or variable/constant names, plus group common functionality together, allowing us to access functionality in other parts of our program.

```javascript
namespace MyMathStuff {
  const PI = 3.14;

  // export keyword makes these available outside the namespace w/dot notation
  export function calcCircumference(diameter: number) {
    return diameter * PI;
  }

  export function calcRectangle(width: number, length: number) {
    return width * length;
  }
  // lots more code having to do with math stuff.
}

const PI = 2.99;

console.log(MyMath.calcCircumference(25)); // works
console.log(PI); // 2.99 - doesn't interfere w/MyMath.PI
```

### Namespaces w/Multiple Files

Consider that we have a much larger application, in which we want to split up functionality even further. In this case, we might want to create different files that contain similar functionality, but are specific enough to be on their own.

To solve this we can do a couple things:
1. Duplicate the inclusion of all different files in your html w/the `<script>` tag & specify each different `src=""`, OR
2. Run `tsc --outFile file_to_create.js fileName1.ts fileName2.ts fileName3.ts`, which creates one single file. NOTE: The order matters, so consider the order files will be compiled together in. The last Ts file arguments here are the set of files that will be compiled to create `file_to_create.js`.

Example:

```javascript
// rectangleMath.ts
namespace MyMathStuff {
  export function calcRectangle(width: number, length: number) {
    return width * length;
  }
  // lots more code having to do with parallelograms
}


// circleMath.ts - shares the SAME namespace name, so Ts will combine them
namespace MyMathStuff {
  const PI = 3.14;
  export function calcCircumference(diameter: number) {
    return diameter * PI;
  }
  // lots more code having to do with circles
}

// app.ts (different file) - to use
Using our Code.

// COMMAND LINE: tsc app.js rectangleMath.ts circleMath.ts app.ts
// => creates a compiled app.js file
```

The downside to this approach is that we must list all the files in the tsc compile command.

To improve this: use **Namespace Imports**. TypeScript has its own syntax for importing Namespaces, using 3 forward slashes & a specific html-like tag:

```javascript
// app.ts:

/// <reference path="circleMath.ts" />
/// <reference path="rectangleMath.ts" />

// ...some code

// COMMAND LINE: tsc app.ts --outFile app.js
```

Again, you must use: `tsc fileName.ts --outFile newFileName.js`

> **NOTE**: You can also have namespaces *within* namespaces (although they also must include the `export` keyword). To access functionality nested like this, use nested dot notation, as in `MyMath.Circles.calcCircumference(11.234);`. You can make this easier by using `import Circles = MyMath.Circles;` so you can just `Circle.calcCircumference(10.11);`.

### Limitations of Namespaces:

Managability becomes an issue with bigger projects. It may not be clear what dependencies each file relies on. To solve this, it's a good idea to fall back to **modules** that Ts provides.

## Modules

A new folder is added to the project directory called "Math". Inside Math, we have two other files, `circle.ts` & `rectangle.ts`

```javascript
// rectangle.ts
export function calcRectangle(width: number, length: number): number {
  return width * length;
}

// circle.ts
export const PI = 3.14;

export function calcCircumference(diameter: number) {
  return diameter * PI;
}

// app.ts
// leave out `.ts` for file extensions
import { PI, calcCircumference } from "./math/circle";

// errors!!!
```

For this to work, we need a **module loader**: such as `SystemJs`, which handles all kinds of formats for the modules. Here are the steps to get this up & running:

1. `npm install systemjs --save` (--save = use in production)
2. In app's html files / templates, replace the `app.js` script file with `<script src="node_modules/systemjs/dist/system.js"></script>`.
3. Load our code in the same html file using the snippet from the documentation for SystemJs, modified for our project file path:

```html
<script>
  SystemJs.config({
    baseURL: "/",
    packages: {
      "/": {
        defaultExtension: "js"
      }
    }
  });
  SystemJS.import('/app.js');
</script>
```

### Importing & Exporting Modules

Now we can import everything we need:

```javascript
// app.ts
// leave out `.ts` for file extensions
import { PI, calcCircumference } from "./math/circle";
import { calcRectangle } from "./math/rectangle";

// ES6 provides some available syntax to make our lives a little easier:
import * as Circle from "./math/circle";        // * = all, as XYZ = alias
import * as Rectangle from "./math/rectangle";

console.log(Circle.PI);
console.log(Rectangle.calcRectangle(10, 10));
```

### Module Resolution

Ts will automatically figure out when resolving imports: It sees a relative or absolute path, and will auto look up with either import syntax - the other being: `import { Component } from "@angular/core";`. The absolute path will always be looked up in the `node_modules` folder by default. You can set up global exports using this second syntax to make it available in your application.



















