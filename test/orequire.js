var chai 						= require('chai')
var should 						= chai.should()
var orequire 					= require('../src/orequire')

describe('orequire', function() {

	it('should load a folder as an object structure', function() {
		var object = orequire('./test/test')

		object.should.have.property('un')
		object.should.have.property('deux')
		object.should.have.property('trois')
	})

})