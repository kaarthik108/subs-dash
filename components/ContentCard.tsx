import { fetchContentData } from "@/app/actions";
import { SearchParams } from "@/app/dashboard/page";
import { Suspense } from "react";
import { BarListChart } from "./charts/BarListChart";
import { Card, CardContent, CardHeader } from "./ui/card";

type BarListContentData = {
  name: string;
  value: number;
};

export async function ContentCard({
  month,
  audience,
  contentType,
}: SearchParams) {
  const contentData = await fetchContentData(month, audience, contentType);
  contentData.sort((a, b) => b.value - a.value);

  return (
    <Card
      className="mx-auto overflow-x-auto animate-fade-up w-full h-72 shadow-md"
      style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
    >
      <CardHeader className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
        Content
        <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
          <span>Content Type</span>
          <span>Revenue</span>
        </p>
      </CardHeader>
      <CardContent className="overflow-x-auto w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <BarListChart
            data={contentData as BarListContentData[]}
            filterType="contentType"
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
