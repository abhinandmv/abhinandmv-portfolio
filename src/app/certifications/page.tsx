import Certifications from "@/components/Certifications";

export default async function CertificationsPage() {
  return (
    <article className="mt-8 flex flex-col gap-12 pb-16">
      <section className="flex flex-col gap-8">
        <h1 className="title">my certifications.</h1>
        <Certifications type="certifications" />
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="title text-2xl sm:text-3xl">achievements.</h2>
        <Certifications type="achievements" />
      </section>
    </article>
  );
}
