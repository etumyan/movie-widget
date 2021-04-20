import ApiService, { MultipleResultsResponse } from './ApiService';
import { Person } from '../models';

export class PeopleService {

  api: ApiService;

  constructor(apiKey: string) {
    this.api = new ApiService(apiKey);
  }

  async getOne(id: number) {
    return this.api.request<Person>(`person/${id}`);
  }

  async getAll(startIndex: number, stopIndex: number, query?: string) {
    return query
      ? this.search(query, startIndex, stopIndex)
      : this.getPopular(startIndex, stopIndex);
  }

  private async getPopular(startIndex: number, stopIndex: number) {
    return this.api.getByIndexRange<Person>((page: number) => (
      this.api.request<MultipleResultsResponse<Person>>('person/popular', { page })
    ), startIndex, stopIndex);

  }

  private async search(query: string, startIndex: number, stopIndex: number) {
    return this.api.getByIndexRange<Person>(((query: string, page: number) => (
      this.api.request<MultipleResultsResponse<Person>>('search/person', { query, page })
    )).bind(this, query), startIndex, stopIndex);
  }

};
