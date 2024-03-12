"use client";
import Link from "next/link";
import styled from "./styled.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeLogin } from "@/store/slice/login/login";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [clientIsLogin, setClientIsLogin] = useState(false);
  const [clientIsAdmin, setClientIsAdmin] = useState(false);
  const isLogin = useAppSelector((state) => state.LoginReducer.isLogin);
  const isAdmin = useAppSelector((state) => state.LoginReducer.isAdmin);
  const dispatch = useAppDispatch();

  const handlerExitToClit = () => {
    dispatch(removeLogin());
  };
  useEffect(() => {
    setClientIsLogin(isLogin);
  }, [isLogin]);

  useEffect(() => {
    setClientIsAdmin(isAdmin);
  }, [isAdmin]);

  return (
    <header className={styled.header}>
      <Link href={"/"}>
        <h2 className={styled.title}>Store</h2>
      </Link>
      <nav className={styled.navbar}>
        <ul className={styled.nav}>
          <li>
            <Link href={"/products"}>Products</Link>
          </li>
          <li>
            <Link href={"/car"}>Car</Link>
          </li>
          {clientIsLogin ? (
            <li onClick={handlerExitToClit}>
              <button>Salir</button>
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

          {clientIsAdmin ? (
            <li>
              <Link href={"/admin"}>Admin</Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </header>
  );
};
