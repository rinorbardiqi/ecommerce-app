import { firestore } from "../../firebase/util";

export const handleAddProduct = (product) => {
  return new Promise((reslove, reject) => {
    firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => {
        reslove();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const handleFetchProducts = ({
  filterType,
  startAfterDoc,
  persistProducts = [],
}) => {
  return new Promise((reslove, reject) => {
    const pageSize = 6;
    let ref = firestore
      .collection("products")
      .orderBy("createdDate")
      .limit(pageSize);
    if (filterType) ref = ref.where("productCategory", "==", filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);
    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;
        const data = [
          ...persistProducts,
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentId: doc.id,
            };
          }),
        ];

        reslove({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const handleDeleteProduct = (documentID) => {
  return new Promise((reslove, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .delete()
      .then(() => {
        reslove();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const handleFetchProudct = (productID) => {
  return new Promise((reslove, reject) => {
    firestore
      .collection("products")
      .doc(productID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          reslove(snapshot.data());
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
