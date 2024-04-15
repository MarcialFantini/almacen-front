"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { delProduct } from "@/store/slice/car/car";

import {
  CreateOrderInterface,
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
import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

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
    <section className=" min-h-[400px] w-[90%] max-w-[1200px] m-auto flex flex-col gap-2">
      <header>
        <h2 className=" text-2xl text-center p-4">Carrito de compras</h2>
      </header>
      <Table>
        <TableHeader>
          <TableColumn>Nombre de Producto</TableColumn>
          <TableColumn>Precio</TableColumn>
          <TableColumn>Cantidad</TableColumn>
          <TableColumn>Acción</TableColumn>
        </TableHeader>
        <TableBody>
          {productsCar.map((product, index) => {
            return (
              <TableRow key={index + product.name}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>
                  <Button onClick={handlerDelProductCar(product.id)}>
                    Borrar
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 ">
          <h4>Terminar la compra:</h4>
          {productsCar.length > 0 ? (
            <button onClick={sendOrder}>Comprar</button>
          ) : (
            ""
          )}

          <Button
            color="secondary"
            variant="shadow"
            href={"/products"}
            as={Link}
          >
            Seguir comprando
          </Button>
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
