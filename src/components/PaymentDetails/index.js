import React, { useState, useEffect } from "react";
import FormInput from "../UI/FormInput";
import Button from "../UI/Button";
import CreditCard from "./CreditCard";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import { saveOrderHistory } from "../../redux/Orders/orders.actions";
import {
  selectCartTotal,
  selectCartItems,
} from "../../redux/Cart/cart.selectors";
import { CountryDropdown } from "react-country-region-selector";
import "./styles.scss";
import { clearCart } from "../../redux/Cart/cart.actions";
const mapState = createStructuredSelector({
  total: selectCartTotal,
  cartItems: selectCartItems,
});

const INITIAL_ADDRESS_STATE = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};
const cardInital = {
  number: "",
  name: "",
  expiry: "",
  cvc: "",
};

function PaymentDetails() {
  const { cartItems, total } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [billingAddress, setBillingAddress] = useState({
    ...INITIAL_ADDRESS_STATE,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...INITIAL_ADDRESS_STATE,
  });
  const [creditCard, setCreditCard] = useState(cardInital);
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [order, setOrder] = useState({});
  const handleShipping = (evt) => {
    const { name, value } = evt.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleBilling = (evt) => {
    const { name, value } = evt.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };
  const authForm = () => {
    return (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard ||
      !creditCard.name ||
      !creditCard.cvc ||
      !creditCard.number ||
      !creditCard.expiry
    );
  };
  useEffect(() => {
    if (authForm()) return;
    dispatch(saveOrderHistory(order));
    dispatch(clearCart());
    history.push("/dashboard");
  }, [order]);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (authForm()) return;

    setOrder({
      shippingAddress: { recipientName: recipientName, ...shippingAddress },
      billingAddress: { nameOnCard, ...billingAddress },
      creditCard: { ...creditCard },
      orderItems: cartItems.map((item) => {
        const {
          documentId,
          productThumbnail,
          productName,
          productPrice,
          quantity,
        } = item;
        return {
          documentId,
          productThumbnail,
          productName,
          productPrice,
          quantity,
        };
      }),
      totalPrice: total,
    });
  };
  const creditCardData = ({ number, name, expiry, cvc }) => {
    setCreditCard({ number, name, expiry, cvc });
  };
  console.log(order);
  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <h2>Shipping</h2>
          <FormInput
            required
            placeholder="Recipient Name"
            name="recipientName"
            value={recipientName}
            handleChange={(e) => {
              setRecipientName(e.target.value);
            }}
            type="text"
          />
          <FormInput
            required
            placeholder="Line 1"
            name="line1"
            handleChange={(evt) => {
              handleShipping(evt);
            }}
            value={shippingAddress.line1}
            type="text"
          />
          <FormInput
            placeholder="Line 2"
            name="line2"
            handleChange={(evt) => {
              handleShipping(evt);
            }}
            value={shippingAddress.line2}
            type="text"
          />
          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={(evt) => {
              handleShipping(evt);
            }}
            value={shippingAddress.city}
            type="text"
          />
          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={(evt) => {
              handleShipping(evt);
            }}
            value={shippingAddress.state}
            type="text"
          />
          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={(evt) => {
              handleShipping(evt);
            }}
            value={shippingAddress.postal_code}
            type="text"
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={shippingAddress.country}
              valueType="short"
            />
          </div>
        </div>
        <div className="group">
          <h2>Billing Address</h2>
          <FormInput
            required
            placeholder="Name on Card"
            handleChange={(e) => {
              setNameOnCard(e.target.value);
            }}
            name="nameOnCard"
            value={nameOnCard}
            type="text"
          />
          <FormInput
            required
            placeholder="Line 1"
            name="line1"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.line1}
            type="text"
          />
          <FormInput
            placeholder="Line 2"
            name="line2"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.line2}
            type="text"
          />
          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.city}
            type="text"
          />
          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.state}
            type="text"
          />
          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.postal_code}
            type="text"
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={billingAddress.country}
              valueType="short"
            />
          </div>
        </div>
        <div className="group">
          <h2>Card Details</h2>
          <CreditCard onCreditCardData={creditCardData} />
        </div>
        <div>
          <Button type="submit">Pay now</Button>
          <div className="marginBtn" />
        </div>
      </form>
    </div>
  );
}

export default PaymentDetails;
