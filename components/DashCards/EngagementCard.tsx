import { fetchEngagementData } from "@/app/actions";
import { SearchParams } from "@/app/dashboard/page";
import { cache } from "react";
import { EngagementScatterChart } from "../charts/scatterChart";
import { Card, CardContent, CardHeader } from "../ui/card";

const EngagementCache = cache(
  async (
    month: string,
    audience: string | null,
    contentType: string | null,
    satisfaction: string | null,
    location: string | null,
    age: string | null
  ) => {
    console.log(age);

    const engagementData = await fetchEngagementData(
      month,
      audience,
      contentType,
      satisfaction,
      location,
      age
    );
    return engagementData;
  }
);

export async function EngagementCard({
  month,
  audience,
  contentType,
  satisfaction,
  location,
  age,
}: SearchParams) {
  console.log(age);

  const engagementData = await EngagementCache(
    month,
    audience || null,
    contentType || null,
    satisfaction || null,
    location || null,
    age || null
  );

  return (
    <Card className="h-full">
      <CardHeader className="text-md text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Engagement Rate vs. Satisfaction
      </CardHeader>
      <CardContent>
        <EngagementScatterChart data={engagementData} />
      </CardContent>
    </Card>
  );
}