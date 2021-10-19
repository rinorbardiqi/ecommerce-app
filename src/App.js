import React from "react";

import { useEffect } from "react";
import { Route, Switch } from "react-router";
import { checkUserSession } from "./redux/User/user.actions";
import { useDispatch, useSelector } from "react-redux";
// commponents
import AdminToolBar from "./components/AdminToolBar";
//hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";
// Layouts
import MainLayout from "./layout/MainLayout";
import HomepageLayout from "./layout/HomePageLayout";
import AdminLayout from "./layout/AdminLayout";
import DashboardLayout from "./layout/DashboardLayout";
// PAGES
import HomePage from "./pages/HomePage/index";
import Registration from "./pages/Registration/index";
import Login from "./pages/LoginPage";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Recovery from "./pages/Recovery";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Order from "./pages/Order";

import "./default.scss";
import Payment from "./pages/Payment";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);
  return (
    <div className="App">
      <AdminToolBar />
      <Switch>
        <Route path="/" exact>
          <HomepageLayout>
            <HomePage />
          </HomepageLayout>
        </Route>
        <Route path="/search" exact>
          <MainLayout>
            <Search />
          </MainLayout>
        </Route>
        <Route path="/product/:productID" exact>
          <MainLayout>
            <ProductDetail />
          </MainLayout>
        </Route>
        <Route path="/cart" exact>
          <MainLayout>
            <Cart />
          </MainLayout>
        </Route>
        <Route path="/payment" exact>
          {currentUser && (
            <MainLayout>
              <Payment />
            </MainLayout>
          )}
          {!currentUser && (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        </Route>
        <Route path="/search/:filterType">
          <MainLayout>
            <Search />
          </MainLayout>
        </Route>
        <Route path="/registration">
          <MainLayout>
            <Registration />
          </MainLayout>
        </Route>
        <Route path="/login">
          <MainLayout>
            <Login />
          </MainLayout>
        </Route>
        <Route path="/recovery">
          <MainLayout>
            <Recovery />
          </MainLayout>
        </Route>
        <Route path="/order/:orderID">
          <WithAuth>
            <DashboardLayout>
              <Order />
            </DashboardLayout>
          </WithAuth>
        </Route>
        <Route path="/admin">
          <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </WithAdminAuth>
        </Route>
        <Route path="/dashboard">
          <WithAuth>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </WithAuth>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
