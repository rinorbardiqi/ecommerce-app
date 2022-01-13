import { useState, useRef, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

export default function App({ onCreditCardData }) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  useEffect(() => {
    ref.current.focus();
  }, []);

  useEffect(() => {
    onCreditCardData({ number, name, expiry, cvc });
  }, [number, name, expiry, cvc]);

  const ref = useRef(null);
  return (
    <div className="container">
      <div className="cardContainer">
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focus}
        />
      </div>
      <div className="contentContainer">
        <div className="inputContainer">
          <input
            type="number"
            name="number"
            placeholder="Card Number"
            value={number}
            onChange={(e) => {
              // change this to support all cards properly, since American Express cards only uses 15 numbers
              if (e.target.value.length > 16) return;
              setNumber(e.target.value);
            }}
            onFocus={(e) => setFocus(e.target.name)}
            ref={ref}
          />
          <input
            type="text"
            name="name"
            minLength="2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type="text"
            name="expiry"
            minLength="4"
            maxLength="5"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type="tel"
            name="cvc"
            minLength="3"
            maxLength="4"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
        </div>
      </div>
    </div>
  );
}
