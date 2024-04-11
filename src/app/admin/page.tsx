"use client";
import Link from "next/link";
import styled from "./styled.module.css";
import { Bar } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import {
  getOrdersGraphics,
  getProductsCategoryCount,
} from "@/store/slice/graphics/action";

import {
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  TimeScale,
} from "chart.js";
import { Button } from "@nextui-org/react";
Chart.register(CategoryScale, LinearScale, BarElement, TimeScale);

type GroupedOrders = {
  [key: string]: number;
};

export default function AdminPage() {
  const orders = useAppSelector((state) => state.OrdersGraphicReducer.orders);
  const products = useAppSelector(
    (state) => state.OrdersGraphicReducer.products
  );
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
    dispatch(getProductsCategoryCount(""));
  }, []);
  return (
    <main className={"flex flex-col gap-4 p-4 "}>
      <div className="flex flex-col gap-2 content-center justify-center">
        <Button color="primary" href={"/admin/products"} as={Link}>
          Productos{" "}
        </Button>
        <Button color="secondary" as={Link} href={"/admin/users"}>
          Usuarios
        </Button>
        <Button as={Link} color="danger" href="/admin/orders">
          Ordenes
        </Button>
      </div>

      <div className="flex w-full h-full flex-col gap-2 bg-red-50 p-4">
        <h2>Ordenes:</h2>
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
                backgroundColor: "orange",
                borderColor: "black",
                borderWidth: 1,
                hoverBackgroundColor: "pink",
              },
            ],
          }}
        ></Bar>
      </div>
      <div className="flex flex-col gap-2 bg-red-50 p-4">
        <h2>Products:</h2>
        <Bar
          data={{
            labels: products.map((item) => item.category),
            datasets: [
              {
                label: "Products",
                backgroundColor: "orange",
                borderColor: "black",
                borderWidth: 1,
                data: products.map((item) => item.cantidad),
                hoverBackgroundColor: "pink",
              },
            ],
          }}
        ></Bar>
      </div>
    </main>
  );
}
