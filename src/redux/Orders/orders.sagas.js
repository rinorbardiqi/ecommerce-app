import ordersTypes from "./orders.types";
import { call, put, all, takeLatest } from "redux-saga/effects";
import {
  handleGetOrder,
  handleGetUserOrderHistory,
  handleSaveOrder,
} from "./orders.helpers";
import { auth } from "../../firebase/util";
import { setOrderDetails, setUserOrderHistory } from "./orders.actions";

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);
    yield put(setUserOrderHistory(history));
  } catch (err) {
    console.log(err);
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  );
}
export function* saveOrderHistory({ payload }) {
  try {
    const timestamp = new Date().toDateString();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamp,
    });
  } catch (err) {
    // console.log(err)
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY, saveOrderHistory);
}

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrder(payload);
    yield put(setOrderDetails(order));
  } catch (err) {
    console.log();
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
  ]);
}
