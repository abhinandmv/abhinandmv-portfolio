import data from "@/data/publications.json";
import { publicationSchema } from "@/lib/schemas";
import { PublicationCard } from "./PublicationCard";

export default function Publications() {
  const publications = publicationSchema.parse(data).publications;

  return (
    <section className="grid grid-cols-1 gap-4">
      {publications.map((publication, id) => (
        <PublicationCard key={id} publication={publication} />
      ))}
    </section>
  );
}
