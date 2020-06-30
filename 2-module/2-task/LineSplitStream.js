const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.setEncoding(options.encoding);
    this.lastStr = '';
  }

  _transform(chunk, encoding, callback) {
    const data = chunk.toString().split(os.EOL);

    data.forEach((str, i) => {
      if (data.length - 1 === i) {
        return this.lastStr += str;
      }

      this.lastStr += str;
      this.push(this.lastStr);
      this.lastStr = '';

    });
    callback();
  }

  _flush(callback) {
    this.push(this.lastStr);
    callback();
  }
}

module.exports = LineSplitStream;
