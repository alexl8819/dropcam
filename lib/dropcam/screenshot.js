'use strict';

var inherits = require('inherits'),
	ReadableStream = require('stream').Readable;

function Screenshot(buffers, type) {
	// TODO: Assertion
	if(!Array.isArray(buffers)) throw new Error('Invalid type: Not an array');
	ReadableStream.call(this);
	this.type = type;

	// the image is usually a jpeg
	Object.defineProperty(this, 'type', {
  		enumerable: false,
  		configurable: false,
  		writable: false,
  		value: this.type
	});

	this.buffer = Buffer.concat(buffers);
}

inherits(Screenshot, ReadableStream);

Screenshot.prototype._read = function(size) {
	if(!this.buffer) return this.push(null);
	this.push(this.buffer.slice(0, size));
	this.buffer = this.buffer.slice(size);
}

module.exports = Screenshot;
