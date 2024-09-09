"use client";

import facebookicon from "@/../public/Facebook_f_logo_(2019).svg.png";
import googleicon from "@/../public/google.svg";
import twittericon from "@/../public/Logo_of_Twitter.svg.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  async function handleFormSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <>
      <div className="container mx-auto max-w-5xl mt-5 mb-2 bg-white flex justify-center items-center">
        <div className="flex flex-col items-center p-4 border-0 shadow-2xl shadow-black bg-[#ffffff] rounded-lg mb-8 ">
          <div className="flex flex-row items-center text-center text-6xl font-bold mt-0">
            <span>Register</span>
          </div>
          <p className="my-2">Please enter your details to login</p>
          {userCreated && (
            <div className="my-4 text-center">
              User created.
              <br />
              Now you can{" "}
              <Link className="underline" href={"/login"}>
                Login &raquo;
              </Link>
            </div>
          )}
          {error && (
            <div className="my-4 text-center">
              An error has occurred.
              <br />
              Please try again later
            </div>
          )}

          <form
            className="flex flex-col items-center mt-10 w-96 p-5 md:p-0"
            onSubmit={handleFormSubmit}
          >
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-1 px-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                className="p-4 w-full my-2 bg-gray-100 rounded-md border-0 outline-none"
                type="email"
                name="email"
                placeholder="email"
                value={email}
                disabled={creatingUser}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="password"
                className="block mb-1 px-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                className="p-4 w-full my-2 bg-gray-100 rounded-md border-0 outline-none"
                type="password"
                name="password"
                placeholder="password"
                value={password}
                disabled={creatingUser}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>

            <Button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
              disabled={creatingUser}

            >
              Submit
            </Button>

            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                or
              </span>
            </div>

            <div className="flex flex-row gap-4 items-center justify-center">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <Image
                  className="w-6 h-6"
                  src={googleicon}
                  alt="Google"
                  width={24}
                  height={24}
                />
              </Button>
              <Button
                variant={"outline"}
                type="button"
                onClick={() => signIn("facebook", { callbackUrl: "/" })}
              >
                <Image
                  className="w-6 h-6"
                  src={facebookicon}
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </Button>
              <Button
                variant={"outline"}
                type="button"
                // onClick={() => signIn('twitter', { callbackUrl: '/' })}
              >
                <Image
                  className="w-6 h-6"
                  src={twittericon}
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </Button>
            </div>

            <p className="mt-4">
              Create New account{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
