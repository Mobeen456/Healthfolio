import { Gupter } from "@next/font/google";

export default function WhatBeDo() {
  return (
    <div className="w-full flex flex-col">
      <div className="bg-white pt-10">
        <h1 className="text-bold text-6xl text-center font-gupter">
          What we do
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row  gap-4 bg-white p-10 items-center justify-around">
        <div className="w-full md:w-auto">
          <div className="container rounded-full bg-gray-100 w-60 h-60 flex items-center justify-center">
            Hi
          </div>
          <p className="p-2 text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
            explicabo
          </p>
        </div>
        <div className="w-full md:w-auto">
          <div className="container rounded-full bg-gray-100 w-60 h-60 flex items-center justify-center">
            Hi
          </div>
          <p className="p-2 text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
            explicabo Harum explicabo
          </p>
        </div>
        <div className="w-full md:w-auto">
          <div className="container rounded-full bg-gray-100 w-60 h-60 flex items-center justify-center">
            Hi
          </div>
          <p className="p-2 text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
            explicabo Harum explicabo
          </p>
        </div>
        <div className="w-full md:w-auto">
          <div className="container rounded-full bg-gray-100 w-60 h-60 flex items-center justify-center">
            Hi
          </div>
          <p className="p-2 text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
            explicabo Harum explicabo
          </p>
        </div>
      </div>
    </div>
  );
}
