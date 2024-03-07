import { TableProducts } from "../TableProducts";

export const TableDataProduct = () => {
  return (
    <section>
      <h2>Productos admin</h2>
      <ul>
        <li>
          <button>Crear producto</button>
        </li>
      </ul>
      <TableProducts></TableProducts>
    </section>
  );
};
