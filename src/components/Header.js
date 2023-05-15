import logoPaht from "../images/logo_white.svg";
import { Routes, Route, Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logoPaht} alt="Логотип" />
      <div className="header__navbar">
        {props.email && <p className="header__email">{props.email}</p>}
        <Routes>
          <Route
            path="/signin"
            element={
              <Link
                className="header__link"
                to="/signup"
                onClick={props.handleLogOut}
              >
                Регистрация
              </Link>
            }
          />

          <Route
            path="/signup"
            element={
              <Link className="header__link" to="/signin">
                Войти
              </Link>
            }
          />

          <Route
            path="/"
            element={
              <Link
                className="header__link"
                onClick={props.onSignOut}
                to="/signin"
              >
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}
