"use client";
import { Test } from "@prisma/client";
import { useState, useEffect } from "react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TestList() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tests");
        if (!response.ok) {
          throw new Error("Failed to fetch tests.");
        }
        const data = await response.json();
        console.log(data);
        setTests(data.tests);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-row  justify-center p-8">
      <div>
        {tests.length === 0 ? (
          <p>No tests found</p>
        ) : (
          <div>
            
              {tests.map((test) => (
                <Card className="w-2/3 flex flex-row justify-between items-center m-2" key={test.id} >
                  <CardHeader >
                    <CardTitle className="text-lg font-semibold">
                      {test.name}
                    </CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-center items-center h-full p-0 pr-6 ">
                    <Button>₹{test.price}</Button>
                  </CardFooter>
                </Card>
              ))}
            
          </div>
        )}
      </div>
      <div className="w-[40%] p-4">
        <Card className="w-full flex flex-col">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription> item in a cart</CardDescription>

          </CardHeader>
          <br/>
          <CardContent className="flex flex-row justify-between">
            <p>Random Blood Sugar(RBS) Test</p>
            <p>₹100</p>
          </CardContent>
          <br/>
          <CardFooter className="flex flex-col ">
            <div className="w-full flex flex-row justify-between mb-4">
              <h3>Total</h3>
            <h3>₹100</h3>
            </div>
            
            <Button className="w-full">Veiw Cart</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
