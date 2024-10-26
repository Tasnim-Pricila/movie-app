import { Movie } from "./movie";

export interface Response {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}
