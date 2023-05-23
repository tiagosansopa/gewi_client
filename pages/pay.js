import { useState } from "react";
import { payStyles } from "../styles";
const paymentData = [
  {
    cargo: "Rent",
    fechaLimite: "2023-05-31",
    estado: "Pending",
    cantidad: 1000.55,
  },
  {
    cargo: "Utilities",
    fechaLimite: "2023-05-15",
    estado: "Paid",
    cantidad: 500.75,
  },
  {
    cargo: "Internet",
    fechaLimite: "2023-05-20",
    estado: "Pending",
    cantidad: 250.35,
  },
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Pay = () => {
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const calculateTotal = () => {
    return paymentData.reduce((total, payment) => total + payment.cantidad, 0);
  };
  return (
    <div className={payStyles.container}>
      <h1>Pagos</h1>
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
              className={index % 2 === 0 ? payStyles.evenRow : payStyles.oddRow}
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
      <button className={payStyles.payButton}>Pagar</button>
    </div>
  );
};
export default Pay;
