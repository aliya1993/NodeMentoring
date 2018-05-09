const EventEmitter = require('events');
const fs = require('fs');

class DirWatcher extends EventEmitter {
  constructor() {
    super();    
    this._prevFiles = [];
    this.timerId = null;
  }
  watch(path, delay) {
    this.stopWatching();
    this.timerId = setInterval(() => {
      console.log('watching...');
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
          let filePath = path + '\\' + changedFile;
          this.emit('changed', filePath);
        }, this);
      });
    }, delay)
  }

  stopWatching() {
    console.log('stop watching');
    clearInterval(this.timerId);
  }
}

export default DirWatcher