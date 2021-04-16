import { numberRange } from '../helpers';

type RequestParam = string | number | boolean | undefined;

interface RequestParams {
  [key: string]: RequestParam;
};

export interface MultipleResultsResponse<T> {
  results: T[];
}

const API_URL = process.env.NODE_ENV === 'development'
  ? '/api'
  : 'https://api.themoviedb.org/3';

const DEFAULT_ITEMS_PER_PAGE = 20;

export default class ApiService {

  private apiUrl = API_URL;

  private apiKey: string;

  private defaultParams = {
    language: 'en-US',
    include_adult: 'false',
  };

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async request<T>(endpoint: string, params?: RequestParams) {
    const searchParams = new URLSearchParams({
      api_key: this.apiKey,
      ...this.defaultParams,
      ...params,
    });

    const url = `${this.apiUrl}/${endpoint}?${searchParams}`;

    const response = await fetch(url);

    return response.json() as Promise<T>;
  }

  async getByIndexRange<T>(req: (...args: any[]) => Promise<MultipleResultsResponse<T>>, startIndex: number, stopIndex: number) {
    const pages = this.getPageList(startIndex, stopIndex);
    const response = await Promise.all(pages.map(page => req(page)));
    return response.reduce((acc, curr) => [...acc, ...curr.results], []) as T[];
  }

  private getPageList(startItemIndex: number, stopItemIndex: number) {
    return numberRange(this.getPageByItemIndex(startItemIndex), this.getPageByItemIndex(stopItemIndex));
  }

  private getPageByItemIndex(itemIndex: number) {
    return Math.ceil(itemIndex / DEFAULT_ITEMS_PER_PAGE) + 1;
  }

};
