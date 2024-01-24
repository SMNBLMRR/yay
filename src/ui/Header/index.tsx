"use client";
import {
  NavbarBrand,
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { FunctionComponent } from "react";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <>
      <Navbar className="bg-[#000000db] backdrop-blur-sm shadow-nav-menu">
        <NavbarBrand>
          <p className="font-bold text-4xl text-[#F72585] tracking-widest">
            YAY
          </p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem></NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="secondary"
              className="text-[#9229ff] font-medium"
              href="/login"
              variant="flat"
            >
              Log in
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default Header;
