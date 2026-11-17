import dynamicIconImports from "lucide-react/dynamicIconImports";
import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .min(2, { message: "Must be at least 2 characters." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Invalid email."),
  message: z.string().min(1, { message: "Message is required." }),
});

const iconLink = z.object({
  name: z.string(),
  href: z.string().url(),
  icon: z.custom<keyof typeof dynamicIconImports>(),
});
export type IconLink = z.infer<typeof iconLink>;

const project = z.object({
  name: z.string(),
  description: z.string(),
  href: z.string().url().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()),
  links: z.array(iconLink),
});
export const projectSchema = z.object({ projects: z.array(project) });
export type Project = z.infer<typeof project>;

const experience = z.object({
  name: z.string(),
  href: z.string(),
  title: z.string(),
  logo: z.string(),
  start: z.string(),
  end: z.string().optional(),
  description: z.array(z.string()).optional(),
  links: z.array(iconLink).optional(),
});
export type Experience = z.infer<typeof experience>;

const certification = z.object({
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  description: z.string().optional(),
  icon: z.custom<keyof typeof dynamicIconImports>().optional(),
  links: z.array(iconLink).optional(),
});
export type Certification = z.infer<typeof certification>;
export const certificationSchema = z.object({
  certifications: z.array(certification),
  achievements: z.array(certification),
});

const publication = z.object({
  title: z.string(),
  venue: z.string(),
  date: z.string(),
  role: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  links: z.array(iconLink),
});
export type Publication = z.infer<typeof publication>;
export const publicationSchema = z.object({
  publications: z.array(publication),
});

export const careerSchema = z.object({ career: z.array(experience) });
export const educationSchema = z.object({ education: z.array(experience) });
export const socialSchema = z.object({ socials: z.array(iconLink) });

const product = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  platform: z.string(),
  icon: z.string(),
  image: z.string().optional(),
  /** Until a product is released its pages stay unlisted: not in /products and not indexed. */
  released: z.boolean(),
  links: z.array(iconLink),
  features: z.array(z.string()),
  /** A privacy policy hosted here, at /products/<slug>/privacy… */
  privacy: z
    .object({
      lastUpdated: z.string(),
      sections: z.array(z.object({ heading: z.string(), body: z.string() })),
    })
    .optional(),
  /** …or one on the product's own website. */
  privacyUrl: z.string().url().optional(),
  /** Where to get help; the site's contact page when not set. */
  supportUrl: z.string().url().optional(),
});
export const productSchema = z.object({ products: z.array(product) });
export type Product = z.infer<typeof product>;
