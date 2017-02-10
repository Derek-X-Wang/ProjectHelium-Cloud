import * as Router from 'koa-router';
import {Request} from 'koa';
import * as chalk from 'chalk';
import * as send from 'koa-send';
import * as net from 'net';
import * as WebSocket from 'ws';

const router = new Router();

/**
 * Index page. Currently doesn't do anything. ¯\_(ツ)_/¯
 */
router.get('/', async (ctx, next) => {
  await next;
  // ctx.body = '(This page intentionally left blank)';
  //
  // ctx.status = 200;
  //send(ctx, "/index2.html", { root: __dirname });
});

router.post('/api/rc', async (ctx, next) => {
  await next;
  let heliumId = ctx.request.body.id;
  let code = ctx.request.body.code;
  let heliumIp = ctx.request.body.ip;
  console.log(ctx.request.body);
  let client = new net.Socket();
  client.connect(8002, '192.168.0.23', function(){
    console.log('Connected');
  });

  // let ws = new WebSocket('ws://192.168.0.1:8002');
  // ws.on('open', function open() {
  //   ws.send('something');
  // });
  //
  // ws.on('message', function(data, flags) {
  //   // flags.binary will be set if a binary data is received.
  //   // flags.masked will be set if the data was masked.
  // });
  switch (code) {
    case 1:
      // ctr light
      console.log("code 1");
      let subId = ctx.request.body.ledId;
      console.log("ledId is "+subId);
      let switchValue = (ctx.request.body.isOn == true ? 1 : 0);
      console.log("isOn is "+switchValue);
      client.write('set:'+subId+'='+switchValue);
      break;
    case 2:
      // set wifi
      console.log("code 2");
      let ssid = ctx.request.body.ssid;
      let psd = ctx.request.body.psd;
      break;
    case 3:
      // color temp
      console.log("code 3");
      break;
    default:
      console.log("not a code");
  }

  client.on('close', function(){
    console.log('Connection Closed');
  });
  client.destroy();
  console.log('Client destroy');
  ctx.body = '(Recieved Post)';

  ctx.status = 200;
  //send(ctx, "/index2.html", { root: __dirname });
});

export default router;

interface IKoaRequestWithBody extends Router.IRouterContext {
  request: IKoaBodyParserRequest;
}

interface IKoaBodyParserRequest extends Request {
  body: any;
}
