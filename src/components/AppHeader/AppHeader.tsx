import { ChangeEvent, FC, FormEvent } from "react";
import headerStyles from "./AppHeader.module.css";
import vkLogo from "../../assets/images/vk-logo.png";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTE } from "../../utils/constants";
import { navLinks } from "../../utils/constants";
import { HeaderLink } from "../HeaderLink/HeaderLink";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "../../ui/Avatar/Avatar";
import { useAppDispatch } from "../../services/store/hooks";
import { filteredMoviesByName } from "../../services/features/movies/movieSlice";

export const AppHeader: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchParams({ ...searchParams, [e.target.name]: searchTerm });
    dispatch(filteredMoviesByName(searchTerm));
  };

  return (
    <header id="page-header" className={headerStyles.header}>
      <div className={headerStyles.headerWrapper}>
        <Link target="_blank" to={ROUTE.home}>
          <img
            src={vkLogo}
            alt="Логотип Вконтакте"
            className={headerStyles.headerLogo}
          />
        </Link>
        <nav className={headerStyles.headerNavigation}>
          <ul className={headerStyles.menuList}>
            {navLinks.map((item) => (
              <HeaderLink
                key={item.id}
                textLink={item.name}
                route={item.route}
              />
            ))}
          </ul>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
            autoComplete="off"
            className={headerStyles.headerForm}
          >
            <div className={headerStyles.formWrapper}>
              <SearchIcon className={headerStyles.formIcon} />
              <input
                type="text"
                placeholder="Фильмы, сериалы"
                name="search"
                maxLength={500}
                className={headerStyles.searchField}
                autoComplete="off"
                value={searchParams.get("search") || ""}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </nav>
        <Avatar />
      </div>
    </header>
  );
};
