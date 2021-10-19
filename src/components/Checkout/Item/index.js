import React from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addToCartProduct,
  reduceCartItem,
} from "../../../redux/Cart/cart.actions";

function Item(product) {
  const dispatch = useDispatch();
  const { productName, productThumbnail, quantity, productPrice, documentId } =
    product;
  const handleRemoveCartItem = (documentId) => {
    dispatch(removeCartItem({ documentId }));
  };
  const handleAddProduct = (product) => {
    dispatch(addToCartProduct(product));
  };
  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product));
  };
  return (
    <table className="cartItem" border="0" cellPadding="10" cellSpacing="0">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>
            <span
              className="cartBtn"
              onClick={() => handleReduceItem(product)}
            >{` < `}</span>
            <span>{quantity}</span>
            <span
              className="cartBtn"
              onClick={() => handleAddProduct(product)}
            >{` > `}</span>
          </td>
          <td>€{productPrice}</td>
          <td align="center">
            <span
              className="cartBtn"
              onClick={() => handleRemoveCartItem(documentId)}
            >
              X
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Item;
