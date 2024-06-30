export interface IMoviesResponse<T> {
  docs: T[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface IRating {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

export interface IPoster {
  url: string;
  previewUrl: string;
}

export interface IGenre {
  name: string;
}

export interface ICountry {
  name: string;
}

export interface ReleaseYear {
  start: number;
  end?: number;
}

export interface IMovie {
  ageRating?: number;
  alternativeName?: string;
  countries?: ICountry[];
  description?: string;
  genres: IGenre[];
  id: number;
  isSeries: boolean;
  movieLength?: number;
  name?: string;
  poster: IPoster;
  rating: IRating;
  ratingMpaa?: number;
  releaseYears: ReleaseYear[];
  seriesLength?: number;
  shortDescription?: string;
  status?: string;
  ticketsOnSale: boolean;
  top10?: number;
  top250?: number;
  totalSeriesLength?: number;
  type: "movie" | "tv-series" | "cartoon" | "anime" | "animated-series";
  typeNumber: number;
  votes: IRating;
  year: number;
}

export interface IMovieWithUser extends IMovie {
  user: string;
}
