import CommonTest from "@/components/layouts/CommonTest";
import Header from "@/components/layouts/Header";
import MyMap from "@/components/layouts/MyMap";
import WhatBeDo from "@/components/layouts/WhatBeDo";
import Test from "@/components/resources/section/Test";

export default function Home() {
  return (
    <main className="bg-secondary flex min-h-screen flex-col items-center">
      <Header/>
      <WhatBeDo/>
      <MyMap/>
      <CommonTest/>
    </main>
  );
}
