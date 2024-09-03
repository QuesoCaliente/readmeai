"use client";
import { Button } from "@/components/ui/button";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

export default function Page() {
  return (
    <SignIn.Root>
      <SignIn.Step name="start">
        <div className="py-6">
          <div className="mx-auto flex max-w-sm overflow-hidden rounded-lg bg-white shadow-lg lg:max-w-4xl">
            <div
              className="hidden bg-cover lg:block lg:w-1/2"
              style={{
                backgroundImage: `url('https://i.imgur.com/o7Z95H0.png')`,
                backgroundPosition: "left",
                backgroundSize: "cover",
              }}
            ></div>
            <form className="w-full min-h-[600px] flex flex-col justify-between p-8 gap-4 lg:w-1/2">
              <div className="flex justify-center">LOGO</div>
              <p className="text-center text-xl text-gray-600">Bienvenido!</p>
              <Clerk.Connection
                name="github"
                className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 text-sm font-medium text-neutral-950 shadow outline-none ring-1 ring-black/5 hover:to-neutral-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                  aria-hidden
                  className="size-4"
                >
                  <g clipPath="url(#a)">
                    <path
                      fill="currentColor"
                      d="M8.32 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.498.96 10.756 0 8.32 0 3.91 0 .205 3.591.205 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.32Z"
                    />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h16v16H0z" />
                    </clipPath>
                  </defs>
                </svg>
                Login with Github
              </Clerk.Connection>
              <a
                href={"/"}
                className="mt-3 flex items-center justify-center gap-1 text-gray-500 hover:cursor-pointer hover:underline"
              >
                IoChevronBackCircleSharp 25 volver al inicio
              </a>
            </form>
          </div>
        </div>
      </SignIn.Step>
    </SignIn.Root>
  );
}
