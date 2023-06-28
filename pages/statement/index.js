import { useState, useEffect } from "react";
import { payStyles } from "../../styles";
import { useRouter } from "next/router";
import { withAuth } from "../../components/withAuth";
import { months, statementData } from "../../dummy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Statement = () => {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const calculateTotal = (item) => {
    return item.reduce((total, payment) => total + payment.monto, 0);
  };

  return (
    <div className={payStyles.container}>
      <header className={payStyles.header}>
        <h1>Pagos</h1>
        <img src="/images/temp/statement/icon.png" />
        <div>
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
        </div>
      </header>
      <div>
        <table name="owe" className={payStyles.table}>
          <thead
            onClick={() => (visible ? setVisible(false) : setVisible(true))}
          >
            <tr>
              <th>Mora</th>
              <th>Q {calculateTotal(statementData.debt).toFixed(2)}</th>
            </tr>
          </thead>
          {visible && (
            <>
              <tbody>
                {statementData.debt.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? payStyles.evenRow : payStyles.oddRow
                    }
                  >
                    <td>{item.tipo}</td>
                    <td>{item.monto.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="1"></td>
                  <td>Q {calculateTotal(statementData.debt).toFixed(2)}</td>
                </tr>
              </tfoot>
            </>
          )}
        </table>

        <table name="due" className={payStyles.table}>
          <thead
            onClick={() => (visible1 ? setVisible1(false) : setVisible1(true))}
          >
            <tr>
              <th>Pendiente</th>
              <th>
                {statementData.due.reduce(
                  (total, payment) => total + payment.monto,
                  0
                )}
              </th>
            </tr>
          </thead>
          {visible1 && (
            <>
              <tbody>
                {statementData.due.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? payStyles.evenRow : payStyles.oddRow
                    }
                  >
                    <td>{item.tipo}</td>
                    <td>{item.monto.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="1"></td>
                  <td>{calculateTotal(statementData.due).toFixed(2)}</td>
                </tr>
              </tfoot>
            </>
          )}
        </table>

        <table name="done" className={payStyles.table}>
          <thead
            onClick={() => (visible2 ? setVisible2(false) : setVisible2(true))}
          >
            <tr>
              <th>Pagado</th>
              <th>
                {statementData.done.reduce(
                  (total, payment) => total + payment.monto,
                  0
                )}
              </th>
            </tr>
          </thead>
          {visible2 && (
            <>
              <tbody>
                {statementData.done.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? payStyles.evenRow : payStyles.oddRow
                    }
                  >
                    <td>{item.tipo}</td>
                    <td>{item.monto.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="1"></td>
                  <td>{calculateTotal(statementData.done).toFixed(2)}</td>
                </tr>
              </tfoot>
            </>
          )}
        </table>
      </div>
      <footer>
        <button
          className={payStyles.payButton}
          onClick={() => {
            router.push("statement/pay");
          }}
        >
          Pagar Q{" "}
          {(
            calculateTotal(statementData.due) +
            calculateTotal(statementData.debt)
          ).toFixed(2)}
        </button>
      </footer>
    </div>
  );
};
export const getServerSideProps = withAuth();
export default Statement;
