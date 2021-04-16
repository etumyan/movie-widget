import ApiService, { MultipleResultsResponse } from './ApiService';
import { Movie } from '../models/Movie';

export class MoviesService {

  api: ApiService;

  constructor(apiKey: string) {
    this.api = new ApiService(apiKey);
  }

  async getOne(id: number) {
    return this.api.request<Movie>(`movie/${id}`);
  }

  async getAll(startIndex: number, stopIndex: number, query?: string) {
    return query
      ? this.search(query, startIndex, stopIndex)
      : this.getPopular(startIndex, stopIndex);
  }

  private async getPopular(startIndex: number, stopIndex: number) {
    return this.api.getByIndexRange<Movie>((page: number) => (
      this.api.request<MultipleResultsResponse<Movie>>('movie/popular', { page })
    ), startIndex, stopIndex);

  }

  private async search(query: string, startIndex: number, stopIndex: number) {
    return this.api.getByIndexRange<Movie>(((query: string, page: number) => (
      this.api.request<MultipleResultsResponse<Movie>>('search/movie', { query, page })
    )).bind(this, query), startIndex, stopIndex);
  }

};
