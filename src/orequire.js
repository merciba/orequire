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

module.exports = function(directory) {

	var getObject = function(relative) {
		var object = {}	
		var absolute 					= path.join(__dirname, relative)
		var ignore 						= [ '.DS_Store' ]

		_.map(fs.readdirSync(absolute), function(filename) {
			if (ignore.indexOf(filename) === -1) {
				var absoluteFileName = path.join(absolute, filename)
				var isDir = fs.lstatSync(absoluteFileName).isDirectory()

				if (isDir) {
					relativeFileName = path.join(relative, filename)
					object[filename] = getObject(relativeFileName)
				}
				else {
					filename = filename.replace(/(.js|.coffee|.litcoffee|.json)/, '')
					relativeFileName = path.join(relative, filename)
					object[filename] = require(relativeFileName)
				}
			}
		})

		return object
	}

	return getObject(path.join('../../../', directory))

}