import * as Router from 'koa-router';
import {Request} from 'koa';
import * as chalk from 'chalk';
import * as send from 'koa-send';
import * as net from 'net';

const router = new Router();

import {io, mqttClient} from './main';

router.get('/', async (ctx, next) => {
  await next;
});

router.post('/api/rc', async (ctx, next) => {
  await next;

  let heliumId = ctx.request.body.id;
  let code = ctx.request.body.code;
  switch (code) {
    case 1:
      // ctr light
      let subId = ctx.request.body.ledId;
      let switchValue = (ctx.request.body.isOn == true ? 1 : 0);
      let switchWord = (ctx.request.body.isOn == true ? "on" : "off");
      io.emit('action', `Turn ${switchWord} led ${subId}`);
      mqttClient.publish('action', `1:${subId}:${switchValue}`);
      break;
    case 2:
      // set wifi
      console.log("wifi untilities");
      let wifiOption = ctx.request.body.wifioption;
      if (wifiOption===0) {
        // set extended network ssid and psd
        let essid = ctx.request.body.essid;
        let epsd = ctx.request.body.epsd;
        io.emit('action', 'Set new extended network');
        mqttClient.publish('action', `2:${wifiOption}:${essid}:${epsd}`);
      }
      if (wifiOption===1) {
        let eSwitchValue = (ctx.request.body.isExtenderOn == true ? 1 : 0);
        let eSwitchWord = (ctx.request.body.isExtenderOn == true ? "on" : "off");
        io.emit('action', `Turn extended network ${eSwitchWord}`);
        mqttClient.publish('action', `2:${wifiOption}:${eSwitchValue}`);
      }
      // let ssid = ctx.request.body.ssid;
      // let psd = ctx.request.body.psd;
      break;
    case 3:
      // color temp
      console.log("code 3");
      break;
    default:
      console.log("undefined action, "+code);
  }

  ctx.body = '(Recieved Post)';

  ctx.status = 200;
});

export default router;
