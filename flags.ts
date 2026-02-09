import { dedupe, flag } from "flags/next";

const variantOptions = [
  { value: "control" as const, label: "Control" },
  { value: "variant" as const, label: "Variant" },
];

const sectionOptions = [
  { value: "a" as const, label: "Variant A" },
  { value: "b" as const, label: "Variant B" },
];

type VisitorEntities = { visitor?: { id: string } };

function hashToVariant<T extends string>(
  id: string,
  options: readonly { value: T }[]
): T {
  let h = 0;
  // hash function to convert the id to a number
  for (let i = 0; i < id.length; i++) h = (h << 5) - h + id.charCodeAt(i);
  const index = Math.abs(h) % options.length;
  return options[index].value;
}

const identify = dedupe(
  async ({
    cookies,
    headers,
  }: {
    cookies: { get: (name: string) => { value: string } | undefined };
    headers: { get: (name: string) => string | null };
  }): Promise<VisitorEntities> => {
    const visitorId =
      cookies.get("ab-visitor-id")?.value ?? headers.get("x-ab-visitor-id");
    return visitorId ? { visitor: { id: visitorId } } : {};
  }
);

export const homePageVariant = flag<"control" | "variant", VisitorEntities>({
  key: "home-page-variant",
  description: "Home page A/B variant",
  options: variantOptions,
  identify,
  decide({ entities }) {
    if (!entities?.visitor) return "control";
    return hashToVariant(entities.visitor.id, variantOptions);
  },
});

export const aboutPageVariant = flag<"control" | "variant", VisitorEntities>({
  key: "about-page-variant",
  description: "About page A/B variant",
  options: variantOptions,
  identify,
  decide({ entities }) {
    if (!entities?.visitor) return "control";
    return hashToVariant(entities.visitor.id + "about", variantOptions);
  },
});

export const heroVariant = flag<"a" | "b", VisitorEntities>({
  key: "hero-section-variant",
  description: "Hero section A/B variant",
  options: sectionOptions,
  identify,
  decide({ entities }) {
    if (!entities?.visitor) return "a";
    return hashToVariant(entities.visitor.id + "hero", sectionOptions);
  },
});

export const ctaVariant = flag<"a" | "b", VisitorEntities>({
  key: "cta-section-variant",
  description: "CTA section A/B variant",
  options: sectionOptions,
  identify,
  decide({ entities }) {
    if (!entities?.visitor) return "a";
    return hashToVariant(entities.visitor.id + "cta", sectionOptions);
  },
});

export const precomputeFlags = [
  homePageVariant,
  aboutPageVariant,
  heroVariant,
  ctaVariant,
] as const;
