import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Test from "../resources/section/Test";
export default function CommonTest() {
  return (
    <div>
        <h1 className="text-3xl text-center">Some Common Test</h1>
      <Card>
        <CardContent>
          <p>RBC</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
          <Test/>
        </CardFooter>
      </Card>
    </div>
  );
}
