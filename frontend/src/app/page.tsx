"use client";

import { useState } from "react";
import Navbar, { type TabId } from "@/components/Navbar";
import TabContainer from "@/components/TabContainer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("inicio");

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-[#f1f1f1]">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pt-16 md:pt-20">
        <TabContainer activeTab={activeTab} />
      </main>
    </div>
  );
}
