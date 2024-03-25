"use client";
import Link from "next/link";
import styled from "./styled.module.css";
import { Bar } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { getOrdersGraphics } from "@/store/slice/graphics/action";

import {
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  TimeScale,
} from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, TimeScale);

type GroupedOrders = {
  [key: string]: number;
};

export default function AdminPage() {
  const orders = useAppSelector((state) => state.OrdersGraphicReducer.orders);
  const dispatch = useAppDispatch();

  const groupOrdersByDay = () => {
    const groupedOrders: GroupedOrders = {};
    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      if (groupedOrders[date]) {
        groupedOrders[date] += order.amount;
      } else {
        groupedOrders[date] = order.amount;
      }
    });
    return groupedOrders;
  };

  const groupedOrders = groupOrdersByDay();

  const dates = Object.keys(groupedOrders);
  const amounts = Object.values(groupedOrders);

  useEffect(() => {
    dispatch(getOrdersGraphics(""));
  }, []);
  return (
    <main className={styled.containerPage}>
      <div>
        <Bar
          options={{
            scales: {
              x: {
                stacked: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
          data={{
            labels: dates,
            datasets: [
              {
                label: "Orders",
                data: amounts,
                backgroundColor: "rgba(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                hoverBackgroundColor: "pink",
              },
            ],
          }}
        ></Bar>
      </div>
      <div>
        <Link href={"/admin/products"}>Productos</Link>
        <Link href={"/admin/users"}>Usuarios</Link>
        <Link href={"/admin/orders"}>Ordenes</Link>
      </div>
    </main>
  );
}
