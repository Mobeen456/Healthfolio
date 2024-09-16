import { Gupter } from "@next/font/google";


export default function WhatBeDo() {
  return (
    <div className="w-full flex flex-col">
      <div className="bg-white pt-10">
        <h1 className={`font-gupter font-bold text-4xl md:text-6xl text-center`}>
          What we do
        </h1>
      </div>
      <div className="w-full flex flex-wrap gap-4 bg-white p-10 items-center justify-center md:justify-around">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="w-full sm:w-auto md:w-auto max-w-xs flex flex-col items-center">
            <div className="container rounded-full bg-gray-100 w-60 h-60 flex items-center justify-center">
              Hi
            </div>
            <p className="p-2 text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum explicabo.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
