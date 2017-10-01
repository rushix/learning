import Koa from 'koa';
import koaRouter from 'koa-router';
import body from 'koa-body';

import tests from './tests';
const clonedTests = Object.assign({}, tests);

const app = new Koa();
const router = koaRouter();

const testsWithoutAnswers = (clonedTests.variants || []).reduce((acc, variant) => {
  if (variant.hasOwnProperty('right')) {
    delete variant.right;
  }

  acc.variants.push(variant);
  return acc;
}, { question: tests.question, variants: [] });

router.get('/', body(), ctx => {
  console.log(ctx);

  ctx.body = JSON.stringify(ctx.request);
});

router.get('/tests', body(), ctx => {
  console.warn(tests, testsWithoutAnswers);
  ctx.body = tests;
});

app.use(router.routes());

app.listen(3000);
