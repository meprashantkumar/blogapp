"use client";
import Link from "next/link";
import "./header.css";
import { useContext } from "react";
import { Context } from "@/app/providers";

function Header() {
  const { user } = useContext(Context);
  return (
    <div>
      <header>
        <div className="logo">
          <Link href={"/"}>
            <img src="/logo.jpeg" alt="" />
          </Link>
        </div>

        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/blogs"}>Blogs</Link>
          </li>
          <li>
            {user && user._id ? (
              <Link href={"/account"}>Account</Link>
            ) : (
              <Link href={"/auth"}>Login</Link>
            )}
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;
