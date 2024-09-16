"use client";
import { Gupter } from "@next/font/google";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState, useEffect } from "react";
import { Test } from "@prisma/client";
import Link from "next/link";

export default function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Test[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `/api/tests/search?query=${encodeURIComponent(query)}&limit=5`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.tests);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Error fetching autocomplete suggestions", err);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/tests/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tests.");
      }
      const data = await response.json();

      if (data.tests.length === 0) {
        setError("No tests found.");
      }

      setResults(data.tests);
      setSuggestions([]);
    } catch (err) {
      setError("An error occurred while searching.");
      console.error(err);
    }

    setLoading(false);
  };

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="bg-secondary text-white text-center px-6 sm:px-12 md:px-24 lg:px-48 py-16 md:py-24 lg:py-48">
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-gupter">
        Your Health, Simplified: Book Lab Tests and Access Medical Records with Ease.
      </h1>
      <br />
      <p className="text-sm md:text-base lg:text-lg">
        Easily navigate your healthcare needs with our user-friendly platform. Compare lab services, schedule tests, and provide your doctor with instant access to your recent medical history—all while ensuring your data remains secure.
      </p>
      <div className="mt-4 flex flex-col justify-center items-center px-8 w-full">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={(e) => setQuery(e.target.value)}
          onSubmit={handleSearch}
        />
      </div>
      {error && <p>{error}</p>}


      {suggestions.length > 0 && (
        <ul className="bg-white text-black w-full md:w-1/2 lg:w-1/3 mx-auto mt-2 rounded-md shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setQuery(suggestion.name);
                handleSearch();
                setSuggestions([]);
              }}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}

      {/* Search results */}
      <ul className="mt-6 text-sm md:text-base lg:text-lg">
        {results.map((test) => (
          <li key={test.id} className="mb-2">
            <Link href={`/tests/${test.id}`}>
              {test.name}
            </Link>
            : {test.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
