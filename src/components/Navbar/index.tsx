"use client";
import Link from "next/link";
import styled from "./styled.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeLogin } from "@/store/slice/login/login";

export const Navbar = () => {
  const isLogin = useAppSelector((state) => state.LoginReducer.isLogin);
  const dispatch = useAppDispatch();

  const handlerExitToClit = () => {
    dispatch(removeLogin());
  };

  console.log("is login", isLogin);

  return (
    <header className={styled.header}>
      <h2 className={styled.title}>Store</h2>
      <nav className={styled.navbar}>
        <ul className={styled.nav}>
          <li>Products</li>
          <li>Car</li>
          {isLogin ? (
            <li>
              <button onClick={handlerExitToClit}>Salir</button>
            </li>
          ) : (
            <>
              <li>
                <Link href={"/register"}>Regístrate</Link>
              </li>
              <li>
                <Link href={"/login"}>Ingresa</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
