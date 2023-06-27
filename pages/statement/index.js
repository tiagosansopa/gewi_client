import { useState, useEffect } from "react";
import { payStyles } from "../../styles";
import { useRouter } from "next/router";
import { withAuth } from "../../components/withAuth";
import { months, paymentData } from "../../dummy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Statement = () => {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const calculateTotal = () => {
    return paymentData.reduce((total, payment) => total + payment.cantidad, 0);
  };

  return (
    <div className={payStyles.container}>
      <header>
        <h1>Pagos</h1>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => {
            console.log("back");
          }}
        />
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={() => {
            console.log("next");
          }}
        />
      </header>
      <div>
        <table name="recurring" className={payStyles.table}>
          <tbody>
            {paymentData.map((payment, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? payStyles.evenRow : payStyles.oddRow
                }
              >
                <td>{payment.cargo}</td>
                <td>{payment.cantidad.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="1"></td>
              <td>{calculateTotal().toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <table name="variable" className={payStyles.table}>
          <tbody>
            {paymentData.map((payment, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? payStyles.evenRow : payStyles.oddRow
                }
              >
                <td>{payment.cargo}</td>
                <td>{payment.cantidad.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="1"></td>
              <td>{calculateTotal().toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <footer>
        <button
          className={payStyles.payButton}
          onClick={() => {
            router.push("statement/pay");
          }}
        >
          Pagar
        </button>
      </footer>
    </div>
  );
};
export const getServerSideProps = withAuth();
export default Statement;
