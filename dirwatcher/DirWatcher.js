const EventEmitter = require('events');
const fs = require('fs');

class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this._myFiles = [];
  }
  watch(path, delay) {
    let changedFiles = [];
    setInterval(() => {
      fs.readdir(path, (err, files) => {

        if (this._myFiles && this._myFiles.length === 0) {
          this._myFiles.push(...files);
          changedFiles.push(...files);
        }


        
      });

      for (let i = 0;  i < changedFiles.length; i++) {       
        let filePath = path + '/' + changedFiles[i];      
        this.emit('changed', filePath);
      }     
      changedFiles = [];
    }, delay)
  }
}

export default DirWatcher