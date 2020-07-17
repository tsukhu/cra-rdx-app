

import { rest } from 'msw'
import { postResponse } from "./data";

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
    const limit = Number(req.url.searchParams.get('_limit'))

    return res(
      ctx.delay(1000),
      ctx.json(limit ? postResponse.slice(0,limit): postResponse)
    )
  }),
]

