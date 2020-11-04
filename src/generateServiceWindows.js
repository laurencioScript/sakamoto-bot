const Service = require('node-windows').Service;

var svc = new Service({
  name:'Sakamoto',
  description: 'Melhor bot do brasil',
  script: 'C:\\Users\\Gabriel\\DevProject\\sakamoto\\index.js'
});

svc.on('install',function(){
  svc.start();
});

svc.install();

// svc.on('uninstall',function(){
//   console.log('Uninstall complete.');
//   console.log('The service exists: ',svc.exists);
// });

// // Uninstall the service.
// svc.uninstall();