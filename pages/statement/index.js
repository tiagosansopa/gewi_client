import { useState, useEffect } from "react";
import { payStyles } from "../../styles";
import { useRouter } from "next/router";
import { withAuth } from "../../components/withAuth";
import { months, paymentData } from "../../dummy";

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
      <div className={payStyles.container}>
        <h1>Estado de cuenta</h1>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Select Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <table className={payStyles.table}>
          <thead>
            <tr>
              <th>Cargo</th>
              <th>Fecha Limite</th>
              <th>Estado</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((payment, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? payStyles.evenRow : payStyles.oddRow
                }
              >
                <td>{payment.cargo}</td>
                <td>{payment.fechaLimite}</td>
                <td>{payment.estado}</td>
                <td>{payment.cantidad.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">TOTAL</td>
              <td>{calculateTotal().toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <button
          className={payStyles.payButton}
          onClick={() => {
            router.push("statement/pay");
          }}
        >
          Pagar
        </button>
      </div>
    </div>
  );
};
export const getServerSideProps = withAuth();
export default Statement;
