const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.setEncoding(options.encoding);
    this.limit = options.limit;
    this.countBytes = 0;
  }

  _transform(chunk, encoding, callback) {
    this.countBytes += chunk.length;
    if (this.countBytes > this.limit) {
      return callback(new LimitExceededError());
    }
    return callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
