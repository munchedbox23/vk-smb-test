interface INavLink {
  id: number;
  name: string;
  route: string;
}

interface IRoutes {
  home: string;
  mainLayout: Record<string, string>;
}

export const ROUTE: IRoutes = {
  home: "/",
  mainLayout: {
    movieCatalog: "movie-catalog",
    favouritesMovies: "films/favourites",
    login: "login",
    register: "register",
    resetPass: "reset-password",
    forgotPass: "forgot-password",
    profile: "profile",
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
