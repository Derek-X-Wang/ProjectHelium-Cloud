import * as Router from 'koa-router';
import {Request} from 'koa';
import * as chalk from 'chalk';
import * as send from 'koa-send';

const router = new Router();

import {io, mqttClient} from './main';

enum Action {
    LIGHT_CTR = 1,
    NETWORK = 2,
    LIGHT_TEMP = 3
}

enum Network {
    SET_EXT_NETWORK = 0,
    TOGGLE_WIFI = 1
}

function redirectAction(channel:string, ioMsg:string, mqttMsg:string) {
  io.emit(channel, ioMsg);
  mqttClient.publish(channel, mqttMsg);
}

router.get('/', async (ctx, next) => {
  await next;
});

router.post('/api/v1', async (ctx, next) => {
  await next;

  let heliumId = ctx.request.body.id;
  let action = ctx.request.body.action;
  let option = ctx.request.body.option;
  switch (action) {
    case Action.LIGHT_CTR:
      let subId = option;
      let switchValue = (ctx.request.body.isOn == true ? 1 : 0);
      let switchWord = (ctx.request.body.isOn == true ? "on" : "off");
      redirectAction('action', `Turn ${switchWord} led ${subId}`, `1:${subId}:${switchValue}`);
      break;
    case Action.NETWORK:
      let wifiOption = option;
      if (wifiOption===Network.SET_EXT_NETWORK) {
        let essid = ctx.request.body.essid;
        let epsd = ctx.request.body.epsd;
        redirectAction('action', `Set new extended network`, `2:${wifiOption}:${essid}:${epsd}`);
      }
      if (wifiOption===Network.TOGGLE_WIFI) {
        let eSwitchValue = (ctx.request.body.isOn == true ? 1 : 0);
        let eSwitchWord = (ctx.request.body.isOn == true ? "on" : "off");
        redirectAction('action', `Turn extended network ${eSwitchWord}`, `2:${wifiOption}:${eSwitchValue}`);
      }
      break;
    case Action.LIGHT_TEMP:
      console.log("LIGHT_TEMP");
      break;
    default:
      console.log("undefined action, "+action);
  }

  ctx.body = '(Recieved Post)';

  ctx.status = 200;
});

export default router;
