import { numberRange } from '../helpers';
import ApiService from '../ApiService';
import { Person } from '../models';

export default class PeopleService {

  api: ApiService;

  constructor(apiKey: string) {
    this.api = new ApiService(apiKey);
  }

  getPopularByPage(page = 1) {
    return this.api.request('person/popular', { page });
  }

  getPopularByPages(pages: number[] = [1]) {
    return new Promise<Person[]>(async reslove => {
      const response = await Promise.all(pages.map(page => this.getPopularByPage(page)));

      const json = await Promise.all(response.map(page => page.json()));

      const people = json.reduce((acc, curr) => [...acc, ...curr.results], []);

      reslove(people);
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
