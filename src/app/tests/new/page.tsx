"use client";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewTest() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const testData = { name, description, price };

    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      });

      if (response.ok) {
        // Redirect to another page after success
        router.push("/tests");
      } else {
        console.error("Failed to create test");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Create a New Test</h1>
      {/* <form onSubmit={handleSubmit} className="flex flex-row gap-4">
        <div >
          <label
            htmlFor="name"
            className="block mb-1 px-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Test Name:
          </label>
          <input
            type="text"
            className="p-4 my-2 bg-gray-100 rounded-md border-0 outline-none"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-1 px-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description:
          </label>
          <input
            type="text"
            className="p-4 my-2 bg-gray-100 rounded-md border-0 outline-none"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block mb-1 px-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            className="p-4 my-2 bg-gray-100 rounded-md border-0 outline-none"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            required
          />
        </div>
        <button
          className="p-4 my-2 bg-blue-500 rounded-md border-0 outline-none"
          type="submit"
        >
          Add Test
        </button>
      </form> */}















    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm m-4 p-2">
      <CardHeader>
        <CardTitle>Add New Test Details</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Input
          id="test-name"
          placeholder="Test Name"
          value={name}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value)}
        />
        <Input
          id="test-description"
          placeholder="Test Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          id="test-price"
          placeholder="Test Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">Add Test</Button>
      </CardFooter>
    </Card>
    </form>
    

      

    </div>
  );
}
