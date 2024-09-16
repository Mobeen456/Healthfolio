import { Test } from "@prisma/client";
import { prisma } from "@/components/resources/lib/prisma"; // Assuming you are using Prisma
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestDetailsProps {
  params: { id: string };
}

async function fetchTest(id: string): Promise<Test | null> {
  const test = await prisma.test.findUnique({
    where: { id: String(id) },
  });
  return test;
}

export default async function TestDetails({ params }: TestDetailsProps) {
  const test = await fetchTest(params.id);

  if (!test) {
    return <p>No test found.</p>;
  }

  return (
    <div className="w-full max-w-screen-md mx-auto py-10 px-6">
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>{test.name}</CardTitle>
          <CardDescription>
            <img
              src={"test.image"}
              alt="test image"
              width={"512px"}
              height={"512px"}
            />
          </CardDescription>
          <CardDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
            unde quam deleniti, eum aliquam porro nostrum ipsam necessitatibus
            voluptate saepe architecto facilis ad, molestiae voluptatibus
            voluptatum aliquid omnis, iste in!
          </CardDescription>
          <CardContent></CardContent>
          <CardFooter>
            <Button className="text-xl">${test.price}</Button>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}
