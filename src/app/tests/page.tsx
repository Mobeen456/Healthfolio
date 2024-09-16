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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
    <div className="flex flex-col md:flex-row justify-center p-4 md:p-8">
      {/* Test Cards */}
      <div className="w-full md:w-2/3 mb-4 md:mb-0">
        {tests.length === 0 ? (
          <p>No tests found</p>
        ) : (
          <div>
            {tests.map((test) => (
              <Card className="flex flex-col md:flex-row justify-between items-center m-4" key={test.id}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {test.name}
                  </CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center items-center h-full  p-6">
                  <Button>₹{test.price}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary (Hidden on Small Screens) */}
      <div className="hidden md:block w-full md:w-1/3 p-4">
        <Card className="w-full flex flex-col">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>1 item in the cart</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between">
            <p>Random Blood Sugar (RBS) Test</p>
            <p>₹100</p>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="flex justify-between mb-4">
              <h3>Total</h3>
              <h3>₹100</h3>
            </div>
            <Button className="w-full">View Cart</Button>
          </CardFooter>
        </Card>
      </div>

      {/* View Cart Button (Visible on Small Screens) */}
      <div >
      <Dialog>
      <DialogTrigger asChild className="h-16 block md:hidden fixed bottom-0 left-0 right-0 p-4 bg-slate-600 shadow-lg">
        <Button variant="outline">View Cart</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order Summary</DialogTitle>
          <DialogDescription>
            `{tests.length} items in the cart`
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            Red Blood Sugar(RBS) Test
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </div>
    </div>
  );
}
