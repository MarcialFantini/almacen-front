"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeLogin } from "@/store/slice/login/login";
import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";

const menuItems: {
  title: string;
  link: string;
}[] = [
  // { title: "Nosotros", link: "/about" },
  { title: "Inicio", link: "/" },

  { title: "Productos", link: "/products" },
  { title: "Carrito", link: "/car" },
];
export const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLogin = useAppSelector((state) => state.LoginReducer.isLogin);
  const isAdmin = useAppSelector((state) => state.LoginReducer.isAdmin);
  const dispatch = useAppDispatch();

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle></NavbarMenuToggle>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.title}-${index}`}>
            <Link
              onClick={() => {
                setIsMenuOpen(false);
              }}
              color="danger"
              className="w-full"
              href={item.link}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        {isLogin || (
          <>
            <NavbarMenuItem key={`1- login}`}>
              <Link
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                color="primary"
                className="w-full"
                href={"/login"}
                size="lg"
              >
                Login
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem key={`2- register}`}>
              <Link
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                color="primary"
                className="w-full"
                href={"/register"}
                size="lg"
              >
                Register
              </Link>
            </NavbarMenuItem>
          </>
        )}
        {!isAdmin || (
          <NavbarMenuItem key={`admin - 5`}>
            <Link
              onClick={() => {
                setIsMenuOpen(false);
              }}
              color="danger"
              className="w-full"
              href={"/admin"}
              size="lg"
            >
              Admin
            </Link>
          </NavbarMenuItem>
        )}
        {!isLogin || (
          <NavbarMenuItem>
            <Button
              onClick={() => {
                dispatch(removeLogin());
                setTimeout(() => {
                  setIsMenuOpen(false);
                }, 300);
              }}
            >
              Log out
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};
