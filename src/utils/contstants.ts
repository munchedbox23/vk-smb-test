interface INavLink {
  id: number;
  name: string;
  route: string;
}

export const ROUTE = {
  home: "/",
  mainLayout: {
    movieCatalog: "movie-catalog",
    favouritesMovies: "films/favourites",
  },
};

export const navLinks: Array<INavLink> = [
  {
    id: 1,
    name: "Онлайн кинотеатр",
    route: `/${ROUTE.mainLayout.movieCatalog}`,
  },
  {
    id: 2,
    name: "Избранное",
    route: `/${ROUTE.mainLayout.favouritesMovies}`,
  },
];
