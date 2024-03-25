"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styled from "./styled.module.css";
import { OrdersStatus, delProduct, resetCar } from "@/store/slice/car/car";
import Link from "next/link";
import {
  CreateOrderInterface,
  OrderOne,
  crearOrdenThunk,
} from "@/store/slice/car/action";
import { useRouter } from "next/navigation";

import { CheckOutForm } from "@/components/CheckOutForm";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OvhpuDEoN0AcwY7mfOK6BQ1xkRTohyxNBaqjrVWlkLtkEfMrlFcSIOHkMQ6lyHAyAv1g7VRATL0ynaOcLxcuObg00ZUEsTlmP"
);

export default function CarPage() {
  const clientSecret = useAppSelector((state) => state.CarReducer.clientSecret);

  const navigator = useRouter();

  const productsCar = useAppSelector((state) => state.CarReducer.products);
  const token = useAppSelector((state) => state.LoginReducer.token);
  const dispatch = useAppDispatch();
  const handlerDelProductCar = (id: string) => () => {
    dispatch(delProduct(id));
  };

  const sendOrder = () => {
    if (!token) {
      return navigator.push("/login");
    }
    const orders: CreateOrderInterface[] = productsCar.map((product) => {
      return {
        product_id: product.id,
        amount: product.amount,
        name: product.name,
        price: product.price,
      };
    });
    dispatch(crearOrdenThunk({ token, order: orders }));
  };

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options: StripeElementsOptions = {
    clientSecret: clientSecret ? clientSecret : "",
    appearance,
  };
  return (
    <section className={styled.view}>
      <header>
        <h2>Carrito de compras</h2>
      </header>
      <table>
        <thead>
          <tr>
            <th>Nombre de Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productsCar.map((product) => {
            return (
              <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.amount}</td>
                <td>
                  <button onClick={handlerDelProductCar(product.id)}>
                    Borrar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styled.containerGrid}>
        <div className={styled.footer}>
          Terminar la compra:
          {productsCar.length > 0 ? (
            <button onClick={sendOrder}>Comprar</button>
          ) : (
            ""
          )}
          <Link className={styled.btn} href={"/products"}>
            <button className={styled.btn + " " + styled.btnDifferent}>
              Seguir comprando
            </button>
          </Link>
        </div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckOutForm></CheckOutForm>
          </Elements>
        )}
      </div>
    </section>
  );
}
