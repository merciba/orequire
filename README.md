orequire
====

[![NPM](https://nodei.co/npm/orequire.png)](https://nodei.co/npm/orequire/)

require a folder as an object

### Usage 

```JavaScript

/*

	Assume your project structure is like this: 

	/
	|
	|- example/
	|		|
	|		|- one.js
	|		|- two.js
	|		|- three/
	|			|
	|			|- four.js
	|
	|- index.js 						// location of this snippet
	|- package.json

*/

var orequire = require('orequire')

var example = orequire('example')

console.log(example)

/* 
Prints: 

	{
		one: require('./example/one'), 
		two: require('./example/two'), 
		three: {
			four: require('./example/three/four')
		}
	}
*/

```

Useful for loading Express middleware and controllers. 