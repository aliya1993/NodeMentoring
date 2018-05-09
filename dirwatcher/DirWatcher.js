const EventEmitter = require('events');
const fs = require('fs');

class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this._prevFiles = [];
  }
  watch(path, delay) {
    setInterval(() => {
      fs.readdir(path, (err, files) => {
        let changedFiles = [];
        let isUpdated = false;

        files.forEach(function (file) {
          if (!this._prevFiles.includes(file)) {
            isUpdated = true;
            changedFiles.push(file);
          }
        }, this);

        this._prevFiles = Array.from(files);

        changedFiles.forEach(function (changedFile) {
          let filePath = path + '/' + changedFile;
          this.emit('changed', filePath);
        }, this);
      });
    }, delay)
  }
}

export default DirWatcher