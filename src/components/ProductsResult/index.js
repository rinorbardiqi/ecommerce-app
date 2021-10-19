import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsStart } from "../../redux/products/products.actions";
import { useHistory, useParams } from "react-router-dom";
import Product from "./Product";
import FormSelect from "../UI/FormSelect";
import LoadMore from "../LoadMore";
import "./styles.scss";
function ProductsResults() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const products = useSelector((state) => state.products.products);
  const { data, queryDoc, isLastPage } = products;
  // const pageCount = Math.ceil(products.length / 6);
  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);
  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };
  if (!Array.isArray(data)) return null;
  if (products.length < 1) {
    return (
      <div className="products">
        <p>No Search results</p>
      </div>
    );
  }
  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Mens",
        value: "mens",
      },
      {
        name: "Womens",
        value: "womens",
      },
    ],
    handleChange: handleFilter,
  };
  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };
  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };
  return (
    <div className="products">
      <h1>Browse Products</h1>
      <FormSelect {...configFilters} />
      <div className="productResults">
        {data.map((product, index) => {
          const { productThumbnail, productName, productPrice } = product;
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;
          const configProduct = {
            ...product,
          };
          return <Product {...configProduct} key={index} />;
        })}
      </div>
      {!isLastPage && <LoadMore {...configLoadMore} />}
  
    </div>
  );
}

export default ProductsResults;
