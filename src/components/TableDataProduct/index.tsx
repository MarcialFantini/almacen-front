import Link from "next/link";
import { TableProducts } from "../TableProducts";

export const TableDataProduct = () => {
  return (
    <section>
      <h2>Productos admin</h2>
      <ul>
        <li>
          <Link href={"/admin/products/create"}>Crear producto</Link>
        </li>
      </ul>
      <TableProducts></TableProducts>
    </section>
  );
};
