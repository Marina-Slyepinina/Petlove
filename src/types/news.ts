export const NEWS_PER_PAGE = 6;

export interface News {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
  id?: string;
}

export interface NewsResponse {
  results: News[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface NewsQueryParams {
  keyword?: string;
  page: number;
  limit: number;
}