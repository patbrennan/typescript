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


