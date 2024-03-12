import Link from "next/link";
import styled from "./styled.module.css";

export default function AdminPage() {
  return (
    <main className={styled.containerPage}>
      <Link href={"/admin/products"}>Productos</Link>
      <Link href={"/admin/product"}>Usuarios</Link>
      <Link href={"/admin/product"}>Ordenes</Link>
    </main>
  );
}
