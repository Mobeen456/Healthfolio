"use client";
import { useEffect, useState, FormEvent } from "react";
import  Plus from "@/components/resources/icons/Plus"; // Adjust import based on actual path
import Trash from "@/components/resources/icons/Trash"; // Adjust import based on actual path
interface Category {
  _id: string;
  name: string;
}

interface MenuItem {
  name?: string;
  description?: string;
  basePrice?: string;
  category?: string;
}

interface MenuItemFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>, item: MenuItem) => void;
  menuItem?: MenuItem;
}

export default function Dashboard({ onSubmit, menuItem }: MenuItemFormProps) {
  const [name, setName] = useState<string>(menuItem?.name || '');
  const [description, setDescription] = useState<string>(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState<string>(menuItem?.basePrice || '');
  const [category, setCategory] = useState<string>(menuItem?.category || '');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then((categories: Category[]) => setCategories(categories));
  }, []);

  return (
    <form
      onSubmit={ev => onSubmit(ev, {  name, description, basePrice, category })}
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: '.3fr .7fr' }}
      >
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories.length > 0 && categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={ev => setBasePrice(ev.target.value)}
          />
        <div>
          <button type="submit">Save</button>
        </div>
      </div>
      </div>
    </form>
  );
}
