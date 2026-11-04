import ContentDirectory from "@/components/marketing/ContentDirectory";

export default function Directory({ initialPosts }: { initialPosts: any[] }) {
  return <ContentDirectory items={initialPosts} kind="posts" />;
}
