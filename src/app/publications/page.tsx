import Publications from "@/components/Publications";

export default async function PublicationsPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">my publications.</h1>

      <Publications />
    </article>
  );
}
