"use client";
import { Gupter } from "@next/font/google";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
export default function Header() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className=" bg-secondary  text-white text-center px-48 m-0 py-48">
      <h1 className="text-6xl font-gupter">
         Your Health, Simplified: Book Lab Tests and Access Medical Records with Ease.
      </h1>
      <br/>
      <p>Easily navigate your healthcare needs with our user-friendly platform. Compare lab services, schedule tests, and provide your doctor with instant access to your recent medical history—all while ensuring your data remains secure.</p>
      <div className="mt-4 flex flex-col justify-center  items-center px-8">
        <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      </div>
      
      
    </div>
  );
}
