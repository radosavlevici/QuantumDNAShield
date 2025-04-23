import { useState, ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

interface AlgorithmTabsProps {
  tabs: TabItem[];
}

const AlgorithmTabs = ({ tabs }: AlgorithmTabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border-b border-slate-200 mb-8 w-full flex flex-wrap justify-start">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={`inline-block p-4 border-b-2 rounded-t-lg mr-2 text-sm font-medium text-center ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent hover:text-primary hover:border-primary/30"
              }`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="w-full">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AlgorithmTabs;
