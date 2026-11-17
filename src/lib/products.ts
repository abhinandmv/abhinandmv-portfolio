import data from "@/data/products.json";
import { productSchema, type Product } from "@/lib/schemas";

export function getProducts(): Product[] {
  return productSchema.parse(data).products;
}

export function getProduct(slug: string): Product | undefined {
  return getProducts().find((product) => product.slug === slug);
}

/** Unreleased products are reachable by their URL (App Review needs that) but kept out of search. */
export function robotsFor(product: Product) {
  return product.released ? undefined : { index: false, follow: false };
}
