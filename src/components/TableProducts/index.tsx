import styled from "./styled.module.css";
const datosFalsos = [
  { id: 1, amount: 10, price: 100 },
  { id: 2, amount: 15, price: 200 },
  { id: 3, amount: 20, price: 300 },
  { id: 4, amount: 25, price: 400 },
  { id: 5, amount: 30, price: 500 },
  { id: 6, amount: 35, price: 600 },
  { id: 7, amount: 40, price: 700 },
  { id: 8, amount: 45, price: 800 },
  { id: 9, amount: 50, price: 900 },
  { id: 10, amount: 55, price: 1000 },
];

export const TableProducts = () => {
  return (
    <table className={styled.table}>
      <thead>
        <tr className={styled.rowTop}>
          <th>id</th>
          <th>amount</th>
          <th>price</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody className={styled.tbody}>
        {datosFalsos.map((user) => {
          return (
            <tr key={user.id} className={styled.rowBody}>
              <td>{user.id}</td>
              <td>{user.amount}</td>
              <td>{user.price}</td>
              <td className={styled.actions}>
                <button>edit</button>
                <button>del</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
