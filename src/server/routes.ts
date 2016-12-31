import * as Router from 'koa-router';
import {Request} from 'koa';
import * as chalk from 'chalk';
import * as send from 'koa-send';

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

export default router;

interface IKoaRequestWithBody extends Router.IRouterContext {
  request: IKoaBodyParserRequest;
}

interface IKoaBodyParserRequest extends Request {
  body: any;
}
