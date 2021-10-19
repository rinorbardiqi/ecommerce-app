import { call, takeLatest, put, all } from "redux-saga/effects";
import productsTypes from "./products.types";
import {
  handleAddProduct,
  handleDeleteProduct,
  handleFetchProducts,
  handleFetchProudct,
} from "./products.helpers";
import {
  setProducts,
  fetchProductsStart,
  setProduct,
} from "./products.actions";
import { auth } from "../../firebase/util";
export function* addProduct({ payload }) {
  try {
    const timestamp = new Date();
    console.log(payload);
    yield handleAddProduct({
      ...payload,
      productAdminUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err);
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}
export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload);
    yield put(setProducts(products));
  } catch (err) {
    console.log(err);
  }
}
export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}
export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err);
  }
}
export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}
export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProudct(payload);
    yield put(setProduct(product));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export default function* productSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
  ]);
}
