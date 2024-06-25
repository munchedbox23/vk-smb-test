import { FC } from "react";
import headerStyles from "./AppHeader.module.css";
import cn from "classnames";

export const AppHeader: FC = () => {
  return (
    <header className={cn(headerStyles.header)}>
      <div>1</div>
    </header>
  );
};
