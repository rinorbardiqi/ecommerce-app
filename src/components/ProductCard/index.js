import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "../../redux/products/products.actions";
import Button from "../UI/Button";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import { addToCartProduct } from "../../redux/Cart/cart.actions";
function ProductCard() {
  const product = useSelector((state) => state.products.product);
  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { productName, productPrice, productThumbnail, productDescription } =
    product;
  useEffect(() => {
    dispatch(fetchProductStart(productID));
    return () => {
      dispatch(setProduct({}));
    };
  }, []);
  const productCart = {
    ...product,
    documentId: productID,
  };
  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addToCartProduct(product));
    history.push("/cart");
  };
  const configAddToCartBtn = {
    type: "button",
  };
  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} alt="product image" />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span>€{productPrice}</span>
          </li>
          <li>
            <div className="addToCart">
              <Button
                onClick={() => {
                  handleAddToCart(productCart);
                }}
                {...configAddToCartBtn}
              >
                Add To Cart
              </Button>
            </div>
          </li>
          <li>
            <h2>Product Description</h2>
          </li>
          <li>
            {productDescription ? (
              <span dangerouslySetInnerHTML={{ __html: productDescription }} />
            ) : (
              <p>No description Found.</p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductCard;
