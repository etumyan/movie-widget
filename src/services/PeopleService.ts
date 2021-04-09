import { numberRange } from '../helpers';
import ApiService from './ApiService';
import { Person } from '../models';

export class PeopleService {

  api: ApiService;

  constructor(apiKey: string) {
    this.api = new ApiService(apiKey);
  }

  getById(id: number) {
    return new Promise<Person>(async reslove => {
      const response = await this.api.request(`person/${id}`);
      const json = await response.json();

      reslove(json);
    });
  }

  getPopularByPage(page = 1, query?: string) {
    return this.api.request('person/popular', { page, query });
  }

  getPopularByPages(pages: number[] = [1], query?: string) {
    return new Promise<Person[]>(async reslove => {
      const response = await Promise.all(pages.map(page => this.getPopularByPage(page, query)));

      const json = await Promise.all(response.map(page => page.json()));

      const people = json.reduce((acc, curr) => [...acc, ...curr.results], []);

      reslove(people);
    });
  }

  getPopularByIndexRange(startIndex: number, stopIndex: number, query?: string) {
    const itemsPerPage = 20;
    const startPage = Math.ceil(startIndex / itemsPerPage) + 1;
    const endPage = Math.ceil(stopIndex / itemsPerPage) + 1;
    const pageList = numberRange(startPage, endPage);

    return this.getPopularByPages(pageList, query);
  }

  async search(query: string, page = 1) {
    const response = await this.api.request('search/person', { query, page });
    const json = await response.json();

    return json.results;
  }

};
