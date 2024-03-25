"use client";
import { useEffect } from "react";
import styled from "./styled.module.css";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { OrdersStatus, resetCar } from "@/store/slice/car/car";
export default function ThankPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetCar(OrdersStatus.inert));
      router.push("/");
    }, 2000);
  }, []);

  return (
    <div className={styled.view}>
      <h2 className={styled.title}>Gracias por comprar!</h2>
    </div>
  );
}
