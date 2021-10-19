import { all, call } from "redux-saga/effects";
import userSagas from "./User/user.sagas";
import productSagas from "./products/products.sagas";
import ordersSagas from "./Orders/orders.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(productSagas),call(ordersSagas)]);
}
