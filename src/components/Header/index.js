import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/logo.png";
import { NavLink, useLocation } from "react-router-dom";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";
import "./styles.scss";
import { signOutUserStart } from "../../redux/User/user.actions";
const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalCartNumber: selectCartItemsCount(state),
});
function Header(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(false);
  const { currentUser, totalCartNumber } = useSelector(mapState);
  const signOut = () => {
    dispatch(signOutUserStart());
  };
  useEffect(() => {
    setActiveMenu(false);
  }, [location]);
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <NavLink to="/">
            <img src={Logo} alt="ecommerce logo" />
          </NavLink>
        </div>
        <nav className={`mainMenu ${activeMenu ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink to="/search" activeClassName="active">
                BROWSE
              </NavLink>
            </li>
            <li>
              <NavLink to="/" activeClassName="active" exact>
                Home
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="callToActions">
          <ul>
            <li>
              <NavLink to="/cart" activeClassName="active">
                Your Cart({totalCartNumber})
                <i class="fas fa-shopping-basket"></i>
              </NavLink>
            </li>
            {currentUser && [
              <li>
                <NavLink to="/dashboard" activeClassName="active">
                  My account
                  <i class="fas fa-user-circle"></i>
                </NavLink>
              </li>,
              <li>
                <span onClick={signOut}>
                  Log out
                  <i class="fas fa-sign-out-alt"></i>
                </span>
              </li>,
            ]}
            {!currentUser && [
              <li className="hideOnMobile">
                <NavLink to="/registration" activeClassName="active">
                  Register
                </NavLink>
              </li>,
              <li>
                <NavLink to="/login" activeClassName="active">
                  Login
                  <i class="fas fa-user-circle"></i>
                </NavLink>
              </li>,
            ]}
            <li className="mobileMenu">
              <span onClick={() => setActiveMenu(!activeMenu)}>
                <i className="fas fa-bars"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

Header.defaultProps = {
  currentUser: null,
};

export default Header;
