import { rest } from 'msw';

export const handlers = [
  rest.get('/api/test', (_, res, ctx) => {

    return res(
      ctx.json({
        test: 'test',
      })
    );
  }),
];
