const fs = require('fs');
const csvjson = require('csvjson');
const minimist = require('minimist');
const request = require('request');

const reverse = (str) => {
  console.log('do reverse');
  return str.split('').reverse().join('')
}

const transform = (str) => {
  console.log('do transform');
  return str.toUpperCase();
}

const outputFile = (filePath) => {
  console.log('do outputFile');
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist: ', filePath);
    process.exit(1);
  }
  let readStream = fs.createReadStream(filePath);
  readStream.pipe(process.stdout);
  readStream.on('error', function (err) {
    console.log('Error while reading file: ', filePath, 'Error: ', err)
  });
}

const convertFromFile = (filePath) => {
  console.log('do convertFromFile');
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist: ', filePath);
  }
  let readStream = fs.createReadStream(filePath);
  readStream.on('data', function (chunk) {
    console.log(convertToJson(chunk.toString()));
  });
  readStream.on('error', function (err) {
    console.log('Error while reading file: ', filePath, 'Error: ', err)
  });

}
const convertToFile = (filePath) => {
  console.log('do convertToFile');
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist: ', filePath);
  }
  let readStream = fs.createReadStream(filePath);
  let pos = filePath.lastIndexOf(".");
  filePath = filePath.substr(0, pos < 0 ? file.length : pos) + ".json";
  let writeStream = fs.createWriteStream(filePath);
  readStream.pipe(writeStream);
  readStream.on('end', () => {
    writeStream.end();
  });
}
const cssLine = ".ngmp18 {\r\n   background-color: #fff;\r\n   overflow: hidden;\r\n   width: 100%;\r\n   height: 100%;\r\n position: relative;\r\n\ }\r\n.ngmp18__hw3 {\r\ncolor: #333;\r\n}\r\n.ngmp18__hw3--t7 {\r\n font-weight: bold;\r\n }";
const cssBundler = (path) => {
  console.log('do cssBundler');
  if (!fs.existsSync(path)) {
    console.log('Path does not exist: ', path);
  }
  fs.readdir(path, (err, files) => {
    let cssFiles = [];
    files.forEach(function (file) {
      let pos = file.lastIndexOf(".");
      let extention = file.substr(pos + 1);
      if (extention == 'css') {
        cssFiles.push(file);
      }
    }, this);
    if (cssFiles.length == 0) {
      console.log('No css filed found path: ', path);
    }
    let writeStream = fs.createWriteStream(path + '\\' + 'bundle.css');
    
    cssFiles.slice(0, 3).forEach(function (file) {
      let readStream = fs.createReadStream(path + '\\' + file);
      readStream.pipe(writeStream, { end: false });
    }, this);

    writeStream.end(cssLine);
  });
}

const convertToJson = (data) => {
  let options = {
    delimiter: ',',
    quote: '"'
  };
  return csvjson.toObject(data, options);
}

const helpMessage = '-a, --action with actions: reverse, transform (data string option is required), outputFile, convertFromFile, convertToFile (file path option is required)  \r\n -f, --file name of file for outputFile, cobverFromFile, convertToFile actions\r\n -h, --help help'

const commands = {
  file: 'file',
  help: 'help',
  action: 'action',
  path: 'path'
}

const actions = {
  'reverse': {
    name: 'reverse',
    requiredOption: null,
    process: (param) => {
      return reverse(param);
    }
  },
  'transform': {
    name: 'transform',
    requiredOption: null,
    process: (param) => {
      return transform(param);
    }
  },
  'outputFile': {
    name: 'outputFile',
    requiredOption: commands.file,
    process: (param) => {
      return outputFile(param);
    }
  },
  'convertFromFile': {
    name: 'convertFromFile',
    requiredOption: commands.file,
    process: (param) => {
      return convertFromFile(param);
    }
  },
  'convertToFile': {
    name: 'convertToFile',
    requiredOption: commands.file,
    process: (param) => {
      return convertToFile(param);
    }
  },
  'cssBundler': {
    name: 'cssBundler',
    requiredOption: commands.path,
    process: (param) => {
      return cssBundler(param);
    }
  }
}

const aliases = {
  '--action': commands.action,
  '--help': commands.help,
  '--file': commands.file,
  '--path': commands.path
};

const shortAliases = {
  '-a': '--action',
  '-h': '--help',
  '-f': '--file',
  '-p': '--path'
}
const handleWrongOption = (option, index) => {
  console.log('Wrong option: ', option, index);
  console.log(helpMessage);
  process.exit(1);
}

const parseArgs = (args) => {
  if (aliases[args[0]] == commands.help || aliases[shortAliases[args[0]]] == commands.help) {
    console.log(helpMessage);
    process.exit(0);
  }
  let instruction = {
    action: '',
    parameter: '',
  };
  let argsWithoutHelp = [];
  let i = 0;
  while (i < args.length) {
    if (aliases[args[i]] != commands.help && aliases[shortAliases[args[i]]] != commands.help) {
      argsWithoutHelp.push(args[i]);
    }
    i++;
  }
  let options = [];
  i = 0;
  while (i < argsWithoutHelp.length) {
    let alias = shortAliases[argsWithoutHelp[i]];
    if (alias != undefined) {
      if (i <= argsWithoutHelp.length - 2) {
        let opt = alias + '=' + argsWithoutHelp[i + 1];
        options.push(opt);
        i = i + 2;
      } else {
        handleWrongOption(argsWithoutHelp[i], 1);
      }
    } else {
      options.push(argsWithoutHelp[i]);
      i++;
    }
  }
  if (options.length > 2) {
    handleWrongOption(args.join(' '), 2);
  }
  let options1 = options[0].split('=');
  let options2 = options[1].split('=');
  if (aliases[options1[0]] != commands.action) {
    handleWrongOption(options1[0], 3);
  }
  if (actions[options1[1]] == undefined) {
    handleWrongOption(options1[0], 4);
  }
  let action = actions[options1[1]];
  let param = '';
  if (action.requiredOption) {
    if (aliases[options2[0]] != action.requiredOption) {
      handleWrongOption(options2[0], 5);
    }
    param = options2[1];
  } else {
    param = options[1];
  }
  instruction.action = action;
  instruction.parameter = param;  
  return instruction;
}

let args = process.argv.slice(2);
let instruction = parseArgs(args);
instruction.action.process(instruction.parameter);
