# Minimal React Setup
For the times when `create-react-app` is too much config. This is a lightweight boilerplate setup that helps start small react projects for proof-of-concept and prototype purposes.

## Included
* React ^16.8
* Babel 7
    * Async/await compatible with example
    * Babel Polyfills for IE 11
* Webpack ^4.29
* Jest, Enzyme, and mock fetch for unit testing
* Unit test example patterns
    * Enzyme `mount`
    * Testing `fetch` with an async component

## Commands
### Install dependencies
```
npm install
```

### Run tests
Note that builds will fail in CI if coverage drops below 85% for lines, statements, functions, or branches.
```
npm run test:coverage
```


### Run
Webpack will attempt to open chrome to http://localhost:3000
```
npm run start
```


### Build production output
Deploy assets included in `./dist`
```
npm run build
```


