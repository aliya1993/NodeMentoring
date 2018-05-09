const fs = require('fs');
const csvjson = require('csvjson')

class Importer {
  constructor(dirwatcher){
    this.dirwatcher = dirwatcher;
    this.importListener = (path) => this.import(path);
    this.importSyncListener = (path) => this.importSync(path);
    this.dirwatcher.on('changed', this.importListener);
    //this.dirwatcher.on('changed', this.importSyncListener);
  }

  stopImporting(){
    this.dirwatcher.removeListener('changed', this.importListener);    
  }

  stopImportingSync(){
     this.dirwatcher.removeListener('changed', this.importListenerSync);    
  }

  import(path) {
    console.log('async importing');
    return new Promise((resolve, reject) => {
      fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
        if (err) {
          reject(err);
          return;
        };
        let json = this.convertToJson(data);
        resolve({ filename: path, data: json });
      });
    });
  }

  importSync(path) {
    console.log('sync importing');
    let data = fs.readFileSync(path, { encoding: 'utf8' });
    return ({ filename: path, data: this.convertToJson(data) });
  }

  convertToJson(data) {
    let options = {
      delimiter: ',',
      quote: '"'
    };
    return csvjson.toObject(data, options);
  }
}

export default Importer