"use client";
import { TableDataProduct } from "@/components/TableDataProduct";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setProductsAdmin } from "@/store/slice/products/actions";
import { useEffect } from "react";

export default function ProductPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setProductsAdmin({ page: 0, offset: 20 }));
  }, []);
  return (
    <main style={{ minHeight: "100vh", padding: "100px 0" }}>
      <TableDataProduct></TableDataProduct>
    </main>
  );
}
