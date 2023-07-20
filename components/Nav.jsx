"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import logo from "@/public/assets/images/logo.png";
import Github from "next-auth/providers/github";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    // const response = getProviders()
    // alert(response)
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    
    setUpProviders();
  }, []);

  
  return (
    <nav className="flex-between w-full mb-16 pt-3 mt-12">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={logo}
          alt="discover-prompts-logo"
          className="object-contain"
          width={250}
          height={250}
        />
        {/* <p className="logo_text">Gpt-Prompts</p> */}
      </Link>
      

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/profile.svg"
                alt="profile"
                className="rounded-full"
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn('github')}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              alt="profile"
              className="rounded-full"
              width={37}
              height={37}
              onClick = {() => setToggleDropdown((prev) => !prev)}
            />

{toggleDropdown && (
            <div className="dropdown">
              <Link href="/profile"
              className="dropdown-link"
              onClick={() => setToggleDropdown(false)}
              >
              My Profile
              </Link>

              <Link href="/create-prompt"
              className="dropdown-link"
              onClick={() => setToggleDropdown(false)}
              >
              Create Prompt
              </Link>

              <button type="button" onClick={() => {setToggleDropdown(false); signOut()}} className="mt-3 w-full black_btn">Sign Out</button>
            </div>
          )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
