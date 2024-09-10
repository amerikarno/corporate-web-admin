import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { afterEach, beforeAll, afterAll } from '@jest/globals';
import '@testing-library/jest-dom';

const handlers = [
  rest.post('http://cwa-alb-607898773.eu-north-1.elb.amazonaws.com/api/v1/corporate/create', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Success' }));
  }),
  rest.post('http://cwa-alb-607898773.eu-north-1.elb.amazonaws.com/api/v1/corporate/create', (req, res, ctx) => {
    return res(ctx.status(400), ctx.json({ error: 'Invalid data' }));
  }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());