"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTest() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const testData = { name, description, price };

    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      if (response.ok) {
        // Redirect to another page after success
        router.push('/tests');
      } else {
        console.error('Failed to create test');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Create a New Test</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Test Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === '' ? '' : Number(e.target.value))
            }
            required
          />
        </div>
        <button type="submit">Create Test</button>
      </form>
    </div>
  );
}
