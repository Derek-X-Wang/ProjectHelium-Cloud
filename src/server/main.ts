import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as chalk from 'chalk';
import * as socketIO from 'socket.io';
import * as http from 'http';
import * as mqtt from 'mqtt';
import * as url from 'url';


import router from './routes';

const app = new Koa();
const port = process.env.PORT || 5050;

app.use(bodyParser())
   .use(serve("."))
   .use(router.routes())
   .use(router.allowedMethods());

var server = http.createServer(app.callback()).listen(port);
export var io = socketIO(server);

io.on('connection', function(socket){
  console.log("Connected io");
  socket.emit('news', { hello: 'world' });
  socket.on('action', function (data:any) {
    console.log(data);
  });
});

// MQTT setup
var mqttUrl = url.parse(process.env.CLOUDmqttUrl || 'mqtt://localhost:1883');
console.log("MQTT: "+url.format(mqttUrl));
var auth = (mqttUrl.auth || ':').split(':');
export var mqttClient = mqtt.connect(url.format(mqttUrl));
mqttClient.on('connect', function () {
  console.log('MQTT Connected');
})
mqttClient.subscribe('action_feedback');
mqttClient.on('message', function (topic:string, message:ArrayBuffer) {
  // convert ArrayBuffer to string
  var msg = String.fromCharCode.apply("", new Uint16Array(message));
  // cut off the '/0' in the end
  msg = msg.substring(0, msg.length - 1);

  console.log(`${topic}:${msg}`);
  switch (topic) {
    case 'action_feedback':
      io.emit('action_feedback', msg);
      break;
    default:
      break;
  }
});

//server.listen(port, () => console.log(chalk.black.bgGreen.bold(`Listening on port? ${port}`)));

export default app;
