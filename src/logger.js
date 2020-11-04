const fs = require('fs');

exports.log = (message) => {
  const logs = require('./../logs.json');
  logs.push({
    createdAt:new Date().toLocaleString(),
    log:message
  })

  fs.writeFile('C:\\Users\\Gabriel\\DevProject\\sakamoto\\logs.json', 
    JSON.stringify(logs, null, 4),
    {
      enconding:'utf-8'
    }, 
    function (err) {
    if (err) throw err;
    }
  );
}

exports.error = (message,local) => {
  const logs = require('./../logs.json');
  logs.push({
    createdAt:new Date().toLocaleString(),
    local,
    error:message,
  })

  fs.writeFile('C:\\Users\\Gabriel\\DevProject\\sakamoto\\logs.json', 
    JSON.stringify(logs, null, 4),
    {
      enconding:'utf-8'
    }, 
    function (err) {
    if (err) throw err;
    }
  );
}

