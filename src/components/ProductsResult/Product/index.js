import React from "react";
import "../styles.scss";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartProduct } from "../../../redux/Cart/cart.actions";
function Product(product) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { documentId, productThumbnail, productName, productPrice } = product;
  if (
    !documentId ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;
  const configAddToCartBtn = {
    type: "button",
  };
  const addToCartHandler = (product) => {
    if (!product) return;
    dispatch(addToCartProduct(product));
    history.push("/cart");
  };
  return (
    <>
      <Card className="product">
        <div className="thumb">
          <Link to={`/product/${documentId}`}>
            <img src={productThumbnail} alt={productName} />
          </Link>
        </div>
        <div className="details">
          <ul>
            <li>
              <span className="name">
                <Link to={`/product/${documentId}`}>{productName}</Link>
              </span>
            </li>
            <li>
              <span className="price">€{productPrice}</span>
            </li>
            <li>
              <div className="addToCart">
                <Button
                  {...configAddToCartBtn}
                  onClick={() => addToCartHandler(product)}
                >
                  Add to cart
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
}

export default Product;
