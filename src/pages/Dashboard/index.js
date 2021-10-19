import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "../../redux/Orders/orders.actions";
import OrderHistory from "../../components/orderhistory";
import "./styles.scss";

const mapState = ({ user, orders }) => ({
  currentUser: user.currentUser,
  orderHistory: orders.orderHistory.data,
});
function Dashboard() {
  const { currentUser, orderHistory } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);
  return (
    <div>
      <h1>Order History</h1>
      <OrderHistory orders={orderHistory} />
    </div>
  );
}

export default Dashboard;
