/*

oRequire

An "object" version of require that returns 
the requested directory's contents as 
properties on an object.

Detects .js, .coffee, .litcoffee, and .json file extensions.

Ideal for loading Express routes,
data models, controllers, etc.

Note that this module is synchronous.

*/

var _ 							= require('lodash')
var path 						= require('path')
var fs 							= require('fs')
var instance 					= {}

var oRequire = function() {
	
	instance.basePath = path.join(__dirname, '../')

	instance.getObject = function(dir) {
		var object = {}
		
		_.map(fs.readdirSync(dir), function(filename) {
			var absolute = path.join(dir, filename)
			var isDir = fs.lstatSync(absolute).isDirectory()

			if (isDir) object[filename] = this.getObject(absolute)
			else {
				filename = filename.replace(/(.js|.coffee|.litcoffee|.json)/, '')
				var relative = path.relative(__dirname, absolute)
				object[filename] = require(relative)
			}
		}.bind(this))

		return object
	}.bind(instance)

	return function() {
		return this.getObject(path.join(this.basePath, arguments[0]))
	}.bind(instance)
}

module.exports = new oRequire()