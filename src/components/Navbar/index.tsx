"use client";
import Link from "next/link";
import styled from "./styled.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeLogin } from "@/store/slice/login/login";
import { useEffect, useState } from "react";
import Image from "next/image";

import srcCar from "../../../public/images/navbar/carrito-de-compras.png";
import srcProducts from "../../../public/images/navbar/proveedor.png";
import srcAdmin from "../../../public/images/navbar/apoyo.png";
import srcHamburger from "../../../public/images/navbar/menu.png";

export const Navbar = () => {
  const [clientIsLogin, setClientIsLogin] = useState(false);
  const [clientIsAdmin, setClientIsAdmin] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState(false);
  const isLogin = useAppSelector((state) => state.LoginReducer.isLogin);
  const isAdmin = useAppSelector((state) => state.LoginReducer.isAdmin);
  const dispatch = useAppDispatch();

  const handlerToggleNav = () => setActiveNavbar(!activeNavbar);
  const closeNav = () => setActiveNavbar(false);
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
      <button onClick={handlerToggleNav}>
        <Image className={styled.img} src={srcHamburger} alt="bar"></Image>
      </button>
      <nav
        className={
          styled.navbar +
          " " +
          styled.navbarMobile +
          " " +
          (activeNavbar ? styled.active : "")
        }
      >
        <ul className={styled.nav + " " + styled.rowColumn}>
          <li>
            <button onClick={handlerToggleNav}>
              <Image
                className={styled.img}
                src={srcHamburger}
                alt="bar"
              ></Image>
            </button>
          </li>
          <li onClick={closeNav}>
            <Link href={"/products"}>
              <picture className={styled.picture}>
                <Image
                  className={styled.img}
                  src={srcProducts}
                  alt="car "
                ></Image>
              </picture>
            </Link>
          </li>
          <li>
            <Link onClick={closeNav} href={"/car"}>
              <picture className={styled.picture}>
                <Image className={styled.img} src={srcCar} alt="car "></Image>
              </picture>
            </Link>
          </li>
          {clientIsLogin ? (
            <li
              onClick={() => {
                handlerExitToClit();
                closeNav();
              }}
            >
              <button>Salir</button>
            </li>
          ) : (
            <>
              <li onClick={closeNav}>
                <Link href={"/register"}>Regístrate</Link>
              </li>
              <li onClick={closeNav}>
                <Link href={"/login"}>Ingresa</Link>
              </li>
            </>
          )}

          {clientIsAdmin ? (
            <li onClick={closeNav}>
              <Link href={"/admin"}>
                <picture className={styled.picture}>
                  <Image
                    className={styled.img}
                    src={srcAdmin}
                    alt="car "
                  ></Image>
                </picture>
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </header>
  );
};
