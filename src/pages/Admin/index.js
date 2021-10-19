import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPrdouctStart,
  fetchProductsStart,
  deleteProductStart,
} from "../../redux/products/products.actions";
import Modal from "./../../components/Modal";
import FormInput from "./../../components/UI/FormInput";
import FormSelect from "./../../components/UI/FormSelect";
import Button from "./../../components/UI/Button";
import LoadMore from "../../components/LoadMore";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./styles.scss";

const Admin = (props) => {
  const products = useSelector((state) => state.products.products);
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("mens");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDesription] = useState("");
  const dispatch = useDispatch();
  const { data, queryDoc, isLastPage } = products;

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };
  const resetForm = () => {
    setProductCategory("mens");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setHideModal(true);
    setProductDesription("");
  }; 
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      productCategory,
      productName,
      productThumbnail,
      productPrice,
      productDescription,
    };
    dispatch(addPrdouctStart(productData));
    resetForm();
  };
  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <>
      <div className="admin">
        <div className="callToActions">
          <ul>
            <li>
              <Button onClick={() => toggleModal()}>Add new product</Button>
            </li>
          </ul>
        </div>

        <Modal {...configModal}>
          <div className="addNewProductForm">
            <form onSubmit={handleSubmit}>
              <h2>Add new product</h2>

              <FormSelect
                label="Category"
                options={[
                  {
                    value: "mens",
                    name: "Mens",
                  },
                  {
                    value: "womens",
                    name: "Womens",
                  },
                ]}
                handleChange={(e) => setProductCategory(e.target.value)}
              />

              <FormInput
                label="Name"
                type="text"
                value={productName}
                handleChange={(e) => setProductName(e.target.value)}
              />

              <FormInput
                label="Main image URL"
                type="url"
                value={productThumbnail}
                handleChange={(e) => setProductThumbnail(e.target.value)}
              />

              <FormInput
                label="Price"
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                value={productPrice}
                handleChange={(e) => setProductPrice(e.target.value)}
              />
              <CKEditor
                editor={ClassicEditor}
                onInit={(editor) => {
                  console.log(Array.from(editor.ui.componentFactory.names()));

                  console.log(editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setProductDesription(data);
                }}
                data="Description"
              />
              <br />
              <Button type="submit">Add product</Button>
            </form>
          </div>
        </Modal>
        <div className="manageProducts">
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <th>
                  <h1>Manage Products</h1>
                </th>
              </tr>
              <tr>
                <td>
                  <table
                    border="0"
                    className="results"
                    cellPadding="10"
                    cellSpacing="0"
                  >
                    <tbody>
                      {Array.isArray(data) &&
                        data.length > 0 &&
                        data.map((product, index) => {
                          const {
                            productName,
                            productThumbnail,
                            productPrice,
                            documentId,
                          } = product;
                          return (
                            <tr key={index}>
                              <td>
                                <img src={productThumbnail} className="thumb" />
                              </td>
                              <td>{productName}</td>
                              <td>$ {productPrice}</td>
                              <td>
                                {" "}
                                <Button
                                  onClick={() => {
                                    dispatch(deleteProductStart(documentId));
                                  }}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>
                  <table border="0" cellPading="10" cellSpacing="0">
                    <tr>
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Admin;
