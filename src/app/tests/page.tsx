"use client";
import { Test } from "@prisma/client";
import { useState, useEffect } from "react";

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
    <div className="flex flex-row p-4">
      <div className="flex flex-row p-4 ">
        {tests.length === 0 ? (
          <p>No tests found</p>
        ) : (
          <div className="w-2/3 flex flex-col items-center justify-between border-2 border-black ">
            {tests.map((test) => (
              <div key={test.id} className="flex flex-row ">
                <div className="">
                  <div className="text-lg font-semibold">{test.name}</div>
                  <div>{test.description}</div>
                </div>

                <div className="ml-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    onClick={() => alert(`Selected test price: ${test.price}`)}
                  >
                    ${test.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-auto p-4 border-2 border-black">
        <div>
          <h1>Summary</h1>
        </div>
      </div>
    </div>
  );
}
