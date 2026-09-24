import data from "@/data/certifications.json";
import { certificationSchema } from "@/lib/schemas";
import { CertificationCard } from "./CertificationCard";

interface Props {
  type: "certifications" | "achievements";
}

export default function Certifications({ type }: Props) {
  const items = certificationSchema.parse(data)[type];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item, id) => (
        <CertificationCard key={id} certification={item} />
      ))}
    </section>
  );
}
