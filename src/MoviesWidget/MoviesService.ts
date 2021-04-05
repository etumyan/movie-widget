import { numberRange } from '../helpers';
import ApiService from '../ApiService';
import { Movie } from '../models/Movie';

export default class MoviesService {

  api: ApiService;

  constructor(apiKey: string) {
    this.api = new ApiService(apiKey);
  }

  getPopularByPage(page = 1) {
    return this.api.request('movie/popular', { page });
  }

  getPopularByPages(pages: number[] = [1]) {
    return new Promise<Movie[]>(async reslove => {
      const response = await Promise.all(pages.map(page => this.getPopularByPage(page)));

      const json = await Promise.all(response.map(page => page.json()));

      const movies = json.reduce((acc, curr) => [...acc, ...curr.results], []);

      reslove(movies);
    });
  }

  getPopularByIndexRange(startIndex: number, stopIndex: number) {
    const itemsPerPage = 20;
    const startPage = Math.ceil(startIndex / itemsPerPage) + 1;
    const endPage = Math.ceil(stopIndex / itemsPerPage) + 1;
    const pageList = numberRange(startPage, endPage);

    return this.getPopularByPages(pageList);
  }

};
