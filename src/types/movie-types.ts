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

export interface IVotes extends IRating {}

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
  end: number | null;
}

export interface IMovie {
  ageRating: number | null;
  alternativeName: string | null;
  countries: Array<ICountry>;
  description: string | null;
  genres: Array<IGenre>;
  id: number;
  isSeries: boolean;
  movieLength: number | null;
  name: string | null;
  poster: IPoster;
  rating: IRating;
  ratingMpaa: number | null;
  releaseYears: Array<ReleaseYear>;
  seriesLength: number | null;
  shortDescription: string | null;
  status: string | null;
  ticketsOnSale: boolean;
  top10: number | null;
  top250: number | null;
  totalSeriesLength: number | null;
  type: "movie" | "tv-series" | "cartoon" | "anime" | "animated-series";
  typeNumber: number;
  votes: IVotes;
  year: number;
}
