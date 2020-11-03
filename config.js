const Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Sakamoto',
  description: 'Melhor bot do brasil',
  script: 'C:\\Users\\Gabriel\\DevProject\\sakamoto\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();