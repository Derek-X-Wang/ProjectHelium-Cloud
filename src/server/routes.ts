import * as Router from 'koa-router';
import {Request} from 'koa';
import * as chalk from 'chalk';
import * as send from 'koa-send';
import * as net from 'net';

const router = new Router();

import {io} from './main';

router.get('/', async (ctx, next) => {
  await next;
});

router.post('/api/rc', async (ctx, next) => {
  await next;

  let heliumId = ctx.request.body.id;
  let code = ctx.request.body.code;
  let heliumIp = ctx.request.body.ip;
  //console.log(ctx.request.body);
  // let client = new net.Socket();
  // client.connect(8002, '192.168.0.23', function(){
  //   console.log('Connected');
  // });
  switch (code) {
    case 1:
      // ctr light
      //console.log("code 1");
      let subId = ctx.request.body.ledId;
      //console.log("ledId is "+subId);
      let switchValue = (ctx.request.body.isOn == true ? 1 : 0);
      //console.log("isOn is "+switchValue);
      //client.write('set:'+subId+'='+switchValue);
      let switchWord = (ctx.request.body.isOn == true ? "on" : "off");
      io.emit('action', `Turn ${switchWord} led ${subId}`);
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

  // client.on('close', function(){
  //   console.log('Connection Closed');
  // });
  // client.destroy();
  // console.log('Client destroy');
  ctx.body = '(Recieved Post)';

  ctx.status = 200;
});

export default router;
