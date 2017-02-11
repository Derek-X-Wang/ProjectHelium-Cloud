import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as chalk from 'chalk';
import * as socketIO from 'socket.io';
import * as http from 'http';


import router from './routes';

const app = new Koa();
const port = process.env.PORT || 3000;

app.use(bodyParser())
   .use(serve("."))
   .use(router.routes())
   .use(router.allowedMethods());

var server = http.createServer(app.callback()).listen(3000);
export var io = socketIO(server);

io.on('connection', function(socket){
  console.log("Connected io");
  socket.emit('news', { hello: 'world' });
  socket.on('action', function (data:any) {
    console.log(data);
  });
});

server.listen(port, () => console.log(chalk.black.bgGreen.bold(`Listening on port ${port}`)));

export default app;
