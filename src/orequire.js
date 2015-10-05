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

module.exports = function() {
	
	var getObject = function(dir) {
		var object = {}
		
		_.map(fs.readdirSync(dir), function(filename) {
			if (filename !== ".DS_Store") {
				var absolute = path.join(dir, filename)
				var relative = path.relative(this.basePath, absolute)
				var isDir = fs.lstatSync(absolute).isDirectory()

				if (isDir) object[filename] = getObject(absolute)
				else {
					filename = filename.replace(/(.js|.coffee|.litcoffee|.json)/, '')
					absolute = path.join(dir, filename)
					relative = path.relative(this.basePath, absolute)

					object[filename] = require(relative)
				}
			}
		}.bind(this))

		return object
	}.bind(this)

	return getObject(path.join(this.basePath, '../../../', arguments[0]))

}.bind({ basePath: __dirname })