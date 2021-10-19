import { firestore } from "../../firebase/util";

export const handleSaveOrder = (order) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc()
      .set(order)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetUserOrderHistory = (uid) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("orders").orderBy("orderCreatedDate");
    ref = ref.where("orderUserID", "==", uid);

    ref
      .get()
      .then((snapshot) => {
        const data = [
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentId: doc.id,
            };
          }),
        ];

        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetOrder = (orderID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(orderID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({
            ...snapshot.data(),
            documentId: orderID,
          });
        }
      })
      .catch((err) => reject(err));
  });
};
