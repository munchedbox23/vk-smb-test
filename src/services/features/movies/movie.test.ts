import movieReducer, {
  initialState,
  setCurrentPage,
  filteredMoviesByName,
  setFilters,
  fetchMoviesWithFilters,
  fetchMovieById,
} from "./movieSlice";
import {
  mockMovie,
  mockMovie2,
  mockMoviesResponse,
} from "../../../utils/test-mock";
import { request } from "../../../utils/requests";

jest.mock("../../../utils/requests", () => ({
  request: jest.fn(),
}));

const mockedRequest = request as jest.MockedFunction<typeof request>;

describe("testing movie slice", () => {
  it("should return the initial state", () => {
    expect(movieReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle setCurrentPage", () => {
    expect(movieReducer(initialState, setCurrentPage(2))).toEqual({
      ...initialState,
      currentPage: 2,
    });
  });

  it("should handle filteredMoviesByName", () => {
    const stateWithMovies = {
      ...initialState,
      movies: [mockMovie, mockMovie2],
      filteredMovies: [mockMovie, mockMovie2],
    };
    const expectedMovies = {
      ...initialState,
      filteredMovies: [mockMovie, mockMovie2],
      movies: [mockMovie],
    };
    expect(
      movieReducer(stateWithMovies, filteredMoviesByName("Гатчина"))
    ).toEqual(expectedMovies);
  });

  it("should handle set selectedMovie", () => {
    expect(
      movieReducer(initialState, {
        type: fetchMovieById.fulfilled.type,
        payload: mockMovie,
      })
    ).toEqual({
      ...initialState,
      selectedMovie: mockMovie,
    });
  });

  it("should handle setFilters", () => {
    const filters = {
      genres: ["документальный"],
      years: ["2024"],
      rating: [7, 10],
    };
    expect(movieReducer(initialState, setFilters(filters))).toEqual({
      ...initialState,
      filters,
    });
  });

  it("should handle fetchMoviesWithFilters pending", () => {
    const action = { type: fetchMoviesWithFilters.pending.type };
    const state = movieReducer(initialState, action);
    expect(state.getMoviesRequestLoading).toBe(true);
    expect(state.getMoviesRequestFailed).toBe(false);
  });

  it("should handle fetchMoviesWithFilters fulfilled", () => {
    const action = {
      type: fetchMoviesWithFilters.fulfilled.type,
      payload: mockMoviesResponse,
    };
    const state = movieReducer(initialState, action);
    expect(state.getMoviesRequestLoading).toBe(false);
    expect(state.movies).toEqual(mockMoviesResponse.docs);
    expect(state.filteredMovies).toEqual(mockMoviesResponse.docs);
    expect(state.totalPages).toEqual(mockMoviesResponse.pages);
    expect(state.currentPage).toEqual(mockMoviesResponse.page);
  });

  it("should handle fetchMoviesWithFilters rejected", () => {
    const action = { type: fetchMoviesWithFilters.rejected.type };
    const state = movieReducer(initialState, action);
    expect(state.getMoviesRequestLoading).toBe(false);
    expect(state.getMoviesRequestFailed).toBe(true);
  });

  it("should fetch movies with filters", async () => {
    const filters = {
      genres: ["документальный"],
      years: ["2024"],
      rating: [7, 10],
    };
    const page = 1;

    const stateWithFilters = {
      ...initialState,
      filters,
    };

    mockedRequest.mockResolvedValueOnce(mockMoviesResponse);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ movies: stateWithFilters }));

    await fetchMoviesWithFilters(page)(dispatch, getState, undefined);

    expect(mockedRequest).toHaveBeenCalledWith(
      expect.stringContaining(
        `page=${page}&limit=50&notNullFields=poster.url&genres.name=документальный&year=2024&rating.imdb=7-10`
      ),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": "4T6X7R1-FAY4CK5-QEV5B3M-TJBP5QK",
        },
      }
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchMoviesWithFilters.fulfilled.type,
        payload: mockMoviesResponse,
      })
    );
  });
});
