import LinkWithIcon from "@/components/LinkWithIcon";
import { getProduct, getProducts, robotsFor } from "@/lib/products";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts()
    .filter((product) => product.privacy)
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: `${product.name} Privacy Policy`, robots: robotsFor(product) };
}

export const dynamicParams = false;

export default async function ProductPrivacyPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product?.privacy) notFound();
  const { lastUpdated, sections } = product.privacy;

  return (
    <article className="prose mt-8 pb-16 dark:prose-invert">
      <LinkWithIcon
        href={`/products/${product.slug}`}
        position="left"
        icon={<ArrowLeftIcon className="size-5" />}
        text={`back to ${product.name}`}
      />
      <div className="space-y-4">
        <h1 className="title">{product.name} privacy policy.</h1>
        <p>Last updated: {lastUpdated}</p>
      </div>
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="title text-2xl">{section.heading}</h2>
          <Markdown>{section.body}</Markdown>
        </section>
      ))}
    </article>
  );
}
