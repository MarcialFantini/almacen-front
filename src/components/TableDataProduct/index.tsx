import Link from "next/link";
import { TableProducts } from "../TableProducts";
import { Button } from "@nextui-org/react";

export const TableDataProduct = () => {
  return (
    <section className="p-4">
      <h2 className="text-4xl">Productos admin</h2>
      <Button
        color="primary"
        className=" my-10"
        href="/admin/products/create"
        as={Link}
      >
        Create producto
      </Button>{" "}
      <TableProducts></TableProducts>
    </section>
  );
};
