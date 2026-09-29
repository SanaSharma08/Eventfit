"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-[#2a171b] bg-[#080808]">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between border-x border-[#2a171b] px-5 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-[-0.08em] text-[#ff1f3d]"
        >
          EVENT<span className="text-[#f5f5f5]">FIT</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-[10px] font-bold tracking-[0.15em] md:flex">
          <Link
            href="/#discover"
            className="text-[#858585] transition-colors hover:text-white"
          >
            DISCOVER
          </Link>

          <Link
            href="/#how-it-works"
            className="text-[#858585] transition-colors hover:text-white"
          >
            HOW IT WORKS
          </Link>

          {session && (
            <>
              <Link
                href="/my-events"
                className="text-[#858585] transition-colors hover:text-white"
              >
                MY EVENTS
              </Link>

              <Link
                href="/settings/preferences"
                className="text-[#858585] transition-colors hover:text-white"
              >
                PREFERENCES
              </Link>
            </>
          )}
        </nav>

        {/* Auth */}
        {status !== "loading" &&
          (session ? (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-[#ff1f3d] px-4 py-2 text-[10px] font-black tracking-[0.15em] rounded-3xl text-white transition-colors hover:bg-[#a90f27]"
            >
              SIGN OUT
            </button>
          ) : (
            <button
              type="button"
              onClick={() => signIn("google")}
              className="bg-[#ff1f3d] px-4 py-2 text-[10px] font-black tracking-[0.15em] rounded-3xl text-white transition-colors hover:bg-[#a90f27]"
            >
              SIGN IN
            </button>
          ))}
      </div>
    </header>
  );
}