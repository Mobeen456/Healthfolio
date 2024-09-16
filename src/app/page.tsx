import CommonTest from "@/components/layouts/CommonTest";
import Header from "@/components/layouts/Header";
import WhatBeDo from "@/components/layouts/WhatBeDo";
export default function Home() {
  return (
    <main className="bg-secondary flex min-h-screen flex-col items-center">
      <Header/>
      <WhatBeDo/>
      <CommonTest/>
    </main>
  );
}
