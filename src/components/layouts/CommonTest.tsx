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
export default function CommonTest() {
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
    <div className="w-4/5 flex flex-col gap-4 py-10 px-20 items-center justify-around">
        <h1 className="text-3xl text-center">Some Common Test</h1>
        <div>
        {tests.length === 0 ? (
          <p>No tests found</p>
        ) : (
          <div className="w-50 grid grid-cols-1 grid-rows-2 md:grid-cols-3 gap-4">
            
              {tests.map((test) => (
      <Card key={test.id}>
        <CardHeader>
          <CardTitle>{test.name}</CardTitle>
          <CardDescription>{test.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between p-6">
          <Button  className="w-full">${test.price}</Button>
        </CardFooter>
      </Card>
    ))}
    </div>

        )}

    </div>
    </div>
  );
}
