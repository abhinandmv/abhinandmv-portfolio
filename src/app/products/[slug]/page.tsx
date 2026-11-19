import Icon from "@/components/Icon";
import LinkWithIcon from "@/components/LinkWithIcon";
import { Badge } from "@/components/ui/Badge";
import { getProduct, getProducts, robotsFor } from "@/lib/products";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: `${product.name}: ${product.tagline}`, description: product.description, robots: robotsFor(product) };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      {product.released && (
        <LinkWithIcon href="/products" position="left" icon={<ArrowLeftIcon className="size-5" />} text="back to products" />
      )}

      <header className="flex items-center gap-5">
        <Image src={product.icon} alt={`${product.name} icon`} width={96} height={96} className="rounded-3xl" priority />
        <div className="flex flex-col gap-1">
          <h1 className="title">{product.name}</h1>
          <p className="text-muted-foreground">{product.tagline}</p>
        </div>
      </header>

      <p>{product.description}</p>

      <div className="flex flex-wrap gap-2">
        {product.links.length > 0 ? (
          product.links.map((link) => (
            <Link key={link.href} href={link.href} target="_blank">
              <Badge className="flex gap-2 px-3 py-1.5">
                <Icon name={link.icon} className="size-4" />
                {link.name}
              </Badge>
            </Link>
          ))
        ) : (
          <Badge variant="secondary" className="px-3 py-1.5">Coming soon to the Mac App Store</Badge>
        )}
      </div>

      {product.image && (
        <Image
          src={product.image}
          alt={`${product.name} screenshot`}
          width={1440}
          height={900}
          className="w-full rounded-xl border"
        />
      )}

      <section className="flex flex-col gap-3">
        <h2 className="title text-2xl">what it does.</h2>
        <ul className="list-disc space-y-1 pl-5">
          {product.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">{product.platform}</p>
      </section>

      {product.guides?.map((guide) => (
        <section key={guide.heading} className="flex flex-col gap-3">
          <h2 className="title text-2xl">{guide.heading}</h2>
          {guide.intro && <p>{guide.intro}</p>}
          <div className="prose max-w-none dark:prose-invert">
            <Markdown>{guide.body}</Markdown>
          </div>
        </section>
      ))}

      <footer className="flex flex-wrap gap-4 text-sm">
        {(product.privacy || product.privacyUrl) && (
          <Link
            href={product.privacy ? `/products/${product.slug}/privacy` : product.privacyUrl!}
            target={product.privacy ? undefined : "_blank"}
            className="underline underline-offset-4"
          >
            Privacy policy
          </Link>
        )}
        <Link
          href={product.supportUrl ?? "/contact"}
          target={product.supportUrl ? "_blank" : undefined}
          className="underline underline-offset-4"
        >
          Support and contact
        </Link>
      </footer>
    </article>
  );
}
