import { rest, RestRequest } from 'msw';

const PREFIX = '/api';

const DEFAULT_ITEMS_PER_PAGE = 20;

function generateResultList(itemGenerator: (i: number) => unknown, page = 1) {
  const startIndex = DEFAULT_ITEMS_PER_PAGE * (page - 1);

  return new Array(DEFAULT_ITEMS_PER_PAGE).fill(null).map(
    (_, i) => itemGenerator(startIndex + i)
  );
}

function getPage(req: RestRequest) {
  return  +(req.url.searchParams.get('page') || '1');
}

export const handlers = [
  rest.get(`${PREFIX}/movie/popular`, (req, res, { json }) => {
    return res(
      json({
        results: generateResultList(i => ({
          title: `Movie #${i + 1}`,
        }), getPage(req)),
      })
    );
  }),
  rest.get(`${PREFIX}/movie/:id`, (_, res, { json }) => {
    return res(
      json({
        title: 'Super Movie'
      })
    );
  }),
  rest.get(`${PREFIX}/person/popular`, (req, res, { json }) => {
    return res(
      json({
        results: generateResultList(i => ({
          name: `Person #${i + 1}`,
        }), getPage(req)),
      })
    );
  }),
  rest.get(`${PREFIX}/person/:id`, (_, res, { json }) => {
    return res(
      json({
        name: 'John Smith'
      })
    );
  }),
  rest.get(`${PREFIX}/search/movie`, (req, res, { json }) => {
    return res(
      json({
        results: generateResultList(i => ({
          title: `Movie #${i + 1}`,
        }), getPage(req)),
      })
    );
  }),
  rest.get(`${PREFIX}/search/person`, (req, res, { json }) => {
    return res(
      json({
        results: generateResultList(i => ({
          name: `Person #${i + 1}`,
        }), getPage(req)),
      })
    );
  }),
];
