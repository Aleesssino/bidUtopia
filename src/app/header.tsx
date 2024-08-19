import Image from "next/image";
import React from "react";
import Logo from "../../public/images/bid-utopia-logo.jpeg";
import { SignOut } from "@/components/sign-out";
import SignIn from "@/components/sign-in";
import { auth } from "@/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  return (
    <div className="bg-gradient-to-r from-[#7a8694] to-blue-50 bg-opacity-3 backdrop-blur-sm">
      <div className="container flex justify-between items-center">
        <div className="flex items-center justify-between gap-4">
          <Link href={"/"}>
            <div className="flex items-center justify-between gap-2 py-2 shadow-none outline-none object-cover">
              <Image
                src={Logo}
                alt="Logo"
                width="50"
                height="50"
                className="w-50 h-50 rounded-full opacity-3"
                priority={true}
              />
              <div className="font-bold hidden sm:flex">
                <h2 className="text-slate-50">Bid</h2>
                <h2 className="text-[#e6b47f] text-shadow-[#] font-bold">
                  Utopia
                </h2>
              </div>
            </div>
          </Link>
          <div>
            <Link href={"/create/item"} className="font-bold hidden sm:flex">
              <h2 className="text-slate-50">Auction an Item</h2>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-5 font-bold">
          <div className="text-slate-900">{session?.user?.name}</div>
          <div> {session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
}
