import { useState, useEffect } from "react";
import { payStyles } from "../../styles";
import { useRouter } from "next/router";
import { withAuth } from "../../components/withAuth";
import { months, paymentData } from "../../dummy";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

const Pay = () => {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [payAll, setPayAll] = useState(true);
  const [sum, setSum] = useState(0.0);

  const [cards, setCards] = useState([
    { tipo: "visa", number: "1245", default: true },
    { tipo: "mc", number: "8478", default: false },
    { tipo: "mc", number: "8945", default: false },
  ]);

  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the payment data to send to the bank API
    const paymentData = {
      cardNumber,
      cardHolderName,
      expiryDate,
      cvv,
    };

    // Send the paymentData object to the bank API
    // Code for making the API request goes here
    // ...
  };

  const calculateTotal = () => {
    return paymentData.reduce((total, payment) => total + payment.cantidad, 0);
  };

  return (
    <div className={payStyles.container}>
      <header>
        <h1>Pagar</h1>
      </header>
      <div>
        <button
          className={payStyles.toggle}
          onClick={() => {
            payAll ? setPayAll(false) : setPayAll(true);
            setSum(0);
          }}
        >
          Toggle
        </button>
        <table name="all" className={payStyles.table}>
          <tbody>
            {paymentData.map((payment, index) => (
              <tr
                key={index}
                className={
                  payAll
                    ? ""
                    : index % 2 === 0
                    ? payStyles.evenRow
                    : payStyles.oddRow
                }
              >
                <td>{payment.cargo}</td>
                <td>{payment.cantidad.toFixed(2)}</td>
                {payAll ? (
                  <td></td>
                ) : (
                  <td className={payStyles.toggle}>
                    <input
                      onClick={(e) => {
                        e.target.checked
                          ? setSum(sum + payment.cantidad)
                          : setSum(sum - payment.cantidad);
                      }}
                      type="checkbox"
                    ></input>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>

        <form>
          {cards.map((card, index) => {
            return (
              <div key={index}>
                <FontAwesomeIcon icon={faCreditCard} />
                <label>
                  <input
                    type="radio"
                    onChange={() => {
                      setSelectedOption(card.number);
                    }}
                    checked={selectedOption === card.number}
                  />
                  {card.tipo}
                </label>
              </div>
            );
          })}
          <label>
            <input
              type="radio"
              onChange={() => {
                setSelectedOption(0);
              }}
              checked={selectedOption === 0}
            />
            otro:
          </label>
        </form>
        {selectedOption === 0 ? (
          <form onSubmit={handleSubmit} className={payStyles.form}>
            <div>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="cardHolderName">Card Holder Name</label>
              <input
                type="text"
                id="cardHolderName"
                value={cardHolderName}
                onChange={(event) => setCardHolderName(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(event) => setExpiryDate(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(event) => setCvv(event.target.value)}
              />
            </div>
          </form>
        ) : (
          ""
        )}
        <form>
          <div>
            <label htmlFor="cvv">Amount to pay</label>
            <input
              type="text"
              id="cvv"
              value={payAll ? calculateTotal().toFixed(2) : sum.toFixed(2)}
              disabled
            />
          </div>
          <button type="submit">Pagar</button>
        </form>
      </div>
    </div>
  );
};
export const getServerSideProps = withAuth();
export default Pay;
