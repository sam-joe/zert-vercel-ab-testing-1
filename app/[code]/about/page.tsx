import Link from "next/link";
import {
  precomputeFlags,
  aboutPageVariant,
  heroVariant,
  ctaVariant,
} from "@/flags";

function AboutHeroSection({ variant }: { variant: "a" | "b" }) {
  if (variant === "a") {
    return (
      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          About us
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          This is the about page. Learn more about our project and how we use
          A/B testing with the Vercel Flags SDK.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Who we are
      </h1>
      <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Discover how we run experiments with page-wise and section-wise variants
        powered by Vercel.
      </p>
    </div>
  );
}

function AboutCtaSection({ variant }: { variant: "a" | "b" }) {
  if (variant === "a") {
    return (
      <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        <Link
          className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:opacity-90 md:w-[158px]"
          href="/"
        >
          Back to home
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
      <Link
        className="flex h-12 w-full items-center justify-center rounded-full border-2 border-zinc-900 px-5 transition-colors hover:bg-zinc-100 dark:border-white dark:hover:bg-zinc-800 md:w-[158px]"
        href="/"
      >
        Go to home
      </Link>
    </div>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const [aboutVariant, hero, cta] = await Promise.all([
    aboutPageVariant(code, precomputeFlags),
    heroVariant(code, precomputeFlags),
    ctaVariant(code, precomputeFlags),
  ]);

  const tagline =
    aboutVariant === "control"
      ? "You're viewing the control variant of the about page."
      : "You're viewing the variant experience of the about page.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{tagline}</p>
        <AboutHeroSection variant={hero} />
        <AboutCtaSection variant={cta} />
      </main>
    </div>
  );
}
