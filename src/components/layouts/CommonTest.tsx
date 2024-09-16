"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Test } from "@prisma/client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import * as React from "react";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommonTest() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tests");
        if (!response.ok) {
          throw new Error("Failed to fetch tests.");
        }
        const data = await response.json();
        setTests(data.tests);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  //  const handleAddToCart= async(testId:String)=>{
  //   try{
  //     const response=await fetch("https://localhost:3000/app/api/cart/add",{
  //       method:"POST",
  //       headers:{
  //         "Content-Type":"application/json",

  //       },
  //       body:JSON.stringify({testId,userId:"currentUserId"}),
  //     });
  //   }
  //   catch{

  //   }
  //  };





  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const displayedTests = showAll ? tests : tests.slice(0, 5);
  const handleViewAll = () => {
    
    router.push("/tests");
  };


  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-8 py-10 px-6 items-center">
      <h1 className="text-3xl text-center">Some Common Tests</h1>
      <div className="w-full">
        {tests.length === 0 ? (
          <p className="text-center">No tests found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedTests.map((test) => (
              <Card
                key={test.id}
                className="w-full h-[300px] flex flex-col justify-between"
              >
                <CardHeader>
                  <CardTitle>{test.name}</CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardFooter className="p-4">
                  <Button className="w-full text-sm md:text-base">
                    ${test.price}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      {tests.length > 5 && (
        <Button className="text-blue-500 cursor-pointer" onClick={handleViewAll}>
          {
            showAll ? "Show less" : "Show all"
          }
        </Button>
      )}
    </div>
  );
}
