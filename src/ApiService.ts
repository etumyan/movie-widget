type RequestParam = string | number | boolean | undefined;

interface RequestParams {
  [key: string]: RequestParam;
};

export default class ApiService {

  private apiUrl = 'https://api.themoviedb.org/3';

  private apiKey: string;

  private defaultParams = {
    language: 'en-US',
    include_adult: 'false',
  };

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  request(endpoint: string, params?: RequestParams) {
    const searchParams = new URLSearchParams({
      api_key: this.apiKey,
      ...this.defaultParams,
      ...params,
    });

    const url = `${this.apiUrl}/${endpoint}?${searchParams}`;

    return fetch(url);
  }

};
