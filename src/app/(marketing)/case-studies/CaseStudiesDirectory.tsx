import ContentDirectory from "@/components/marketing/ContentDirectory";

export default function Directory({
  initialCaseStudies,
}: {
  initialCaseStudies: any[];
}) {
  return <ContentDirectory items={initialCaseStudies} kind="work" />;
}
