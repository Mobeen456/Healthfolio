"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
type TextCardProps = {
    testId: string;
    price: string;
    userId: string;
};

const TextCard = ({ testId, price, userId }: TextCardProps) => {
    const [loading, setLoading] = useState(false);
   
    const addToCart = async () => {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                testId,
                userId,
            }),
        });
        const data = await response.json();
        setLoading(false);
    };
    return (
        <Button onClick={addToCart} disabled={loading}>
            {loading ? "Adding to cart..." : `Add to cart - ${price}`}
        </Button>
    );
};

export default TextCard;    