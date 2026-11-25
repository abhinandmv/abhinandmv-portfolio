import { getProducts } from "@/lib/products";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const released = getProducts().filter((product) => product.released);

export const metadata: Metadata = {
  title: "Products",
  robots: released.length > 0 ? undefined : { index: false, follow: false },
};

export default function ProductsPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">my products.</h1>

      {released.length === 0 ? (
        <p className="text-muted-foreground">Something new is on the way.</p>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {released.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-secondary"
            >
              <Image src={product.icon} alt="" width={64} height={64} className="rounded-2xl" />
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-sm text-muted-foreground">{product.tagline}</p>
                {product.links.length === 0 && (
                  <p className="mt-1 text-xs font-medium text-muted-foreground">Coming soon to the Mac App Store</p>
                )}
              </div>
            </Link>
          ))}
        </section>
      )}
    </article>
  );
}
