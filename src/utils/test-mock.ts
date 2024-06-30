import { IMoviesResponse, IMovie } from "../types/movie-types";

export const mockUser = Object.freeze({
  name: "munchedboxTest",
  email: "test@test.com",
  password: "test123456",
});

export const mockMovie: IMovie = {
  id: 5921398,
  name: "Гатчина. Молчание Сильвии",
  year: 2024,
  description:
    "История 867дней фашистской оккупации Гатчины в годы Великой Отечественной войны.",
  shortDescription:
    "Зверства фашистских захватчиков в оккупированном Красногвардейске. Исторический док с Владимиром Машковым",
  slogan: null,
  rating: {
    kp: 8.585,
    imdb: 0,
    filmCritics: 0,
    russianFilmCritics: 0,
    await: 1,
  },
  ageRating: 18,
  poster: {
    url: "https://image.openmoviedb.com/kinopoisk-images/4486362/1f4d138a-9779-4624-9ee7-2b2c729a5a5a/orig",
    previewUrl:
      "https://image.openmoviedb.com/kinopoisk-images/4486362/1f4d138a-9779-4624-9ee7-2b2c729a5a5a/x1000",
  },
  genres: [
    {
      name: "документальный",
    },
    {
      name: "военный",
    },
  ],
  countries: [
    {
      name: "Россия",
    },
  ],
  isSeries: false,
  releaseYears: [{ start: 2024 }],
  ticketsOnSale: false,
  type: "movie",
  movieLength: 0,
  seriesLength: 0,
  status: "",
  top10: 0,
  top250: 0,
  totalSeriesLength: 0,
  typeNumber: 0,
  votes: {
    kp: 0,
    imdb: 0,
    filmCritics: 0,
    russianFilmCritics: 0,
    await: 0,
  },
};

export const mockMovie2: IMovie = {
  id: 5884949,
  name: "Хаяо Миядзаки: Экстра",
  year: 2018,
  description:
    "Сериал о жизни и творчестве Хаяо Миядзаки, легендарного японского аниматора. Анализируем скрытые смыслы мультфильмов и рассказываем историю их создания.",
  shortDescription: "null",
  slogan: null,
  status: "",
  rating: {
    kp: 0,
    imdb: 0,
    filmCritics: 0,
    russianFilmCritics: 0,
    await: 0,
  },
  movieLength: 0,
  ageRating: 18,
  poster: {
    url: "https://image.openmoviedb.com/kinopoisk-images/4483445/0e9e59e2-a9cc-40a6-a0ad-0e4d1ae9ccc5/orig",
    previewUrl:
      "https://image.openmoviedb.com/kinopoisk-images/4483445/0e9e59e2-a9cc-40a6-a0ad-0e4d1ae9ccc5/x1000",
  },
  genres: [
    {
      name: "документальный",
    },
  ],
  countries: [
    {
      name: "Россия",
    },
  ],
  isSeries: true,
  releaseYears: [{ start: 2018 }],
  ticketsOnSale: false,
  type: "tv-series",
  seriesLength: 10,
  top10: 0,
  top250: 0,
  totalSeriesLength: 10,
  typeNumber: 2,
  votes: {
    kp: 0,
    imdb: 0,
    filmCritics: 0,
    russianFilmCritics: 0,
    await: 0,
  },
};

export const mockMoviesResponse: IMoviesResponse<IMovie> = {
  docs: [mockMovie, mockMovie2],
  limit: 50,
  page: 1,
  pages: 5669,
  total: 283436,
};
