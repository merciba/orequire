orequire
====

[![NPM](https://nodei.co/npm/orequire.png)](https://nodei.co/npm/orequire/)

require a folder as an object

### Usage 

```
npm install orequire
```

Assume your project structure is like this: 

```
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
	|- index.js
	|- package.json

```

In `index.js`, then, you can do:


```JavaScript

var orequire = require('orequire')

var example = orequire('example')

```

`example` now has an object structure mirroring the directory it points to: 

``` 
	{
		one: require('./example/one'), 
		two: require('./example/two'), 
		three: {
			four: require('./example/three/four')
		}
	}

```

### With Express

Assume your project structure is like this: 

```
	/
	|- routes/
	|		|
	|		|- get.js 			// Each returns an object like { '/:id': function(req, res, next) { next() } }
	|		|- post.js
	|		|- put.js
	|		|- patch.js
	|		|- delete.js
	|
	|- controllers/
	|		|
	|		|- home.js
	|		|- user.js
	|
	|- models/
	|		|
	|		|- User.js 
	|
	|- index.js
	|- package.json

```

In `index.js`, then, you can do:

```JavaScript

var _ = require('lodash')
var orequire = require('orequire')
var express = require('express')

var controllers = orequire('controllers')
var models = orequire('models')
var routes = orequire('routes')

var app = express()

// Load your db, etc etc

app.set('port', 3000)

_.forEach(routes, function(route, routeKey) {
	_.forEach(route, function(methods, methodKey) {
		app[routeKey](methodKey, methods)
	})
})

app.listen(app.get('port'), function() {
	console.log('Server listening on port '+app.get('port'))
})

```