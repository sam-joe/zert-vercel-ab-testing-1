import Image from "next/image";
import Link from "next/link";
import {
  precomputeFlags,
  homePageVariant,
  heroVariant,
  ctaVariant,
} from "@/flags";

function HeroSection({ variant }: { variant: "a" | "b" }) {
  if (variant === "a") {
    return (
      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          To get started, edit the page.tsx file.
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Looking for a starting point or more instructions? Head over to{" "}
          <Link
            href="https://vercel.com/templates?framework=next.js"
            className="font-medium text-zinc-950 dark:text-zinc-50"
          >
            Templates
          </Link>{" "}
          or the{" "}
          <Link
            href="https://nextjs.org/learn"
            className="font-medium text-zinc-950 dark:text-zinc-50"
          >
            Learning
          </Link>{" "}
          center.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
      <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Build something great with Next.js
      </h1>
      <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Get started by exploring{" "}
        <Link
          href="https://vercel.com/templates?framework=next.js"
          className="font-medium text-zinc-950 dark:text-zinc-50"
        >
          Vercel templates
        </Link>{" "}
        or dive into the{" "}
        <Link
          href="https://nextjs.org/learn"
          className="font-medium text-zinc-950 dark:text-zinc-50"
        >
          Next.js docs
        </Link>
        .
      </p>
    </div>
  );
}

function CtaSection({ variant }: { variant: "a" | "b" }) {
  if (variant === "a") {
    return (
      <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        <a
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
          href="https://vercel.com/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={16}
            height={16}
          />
          Deploy Now
        </a>
        <a
          className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
      <Link
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 md:w-[158px]"
        href="https://vercel.com/new"
      >
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={16}
          height={16}
        />
        Deploy Now
      </Link>
      <Link
        className="flex h-12 w-full items-center justify-center rounded-full border-2 border-zinc-900 px-5 transition-colors hover:bg-zinc-100 dark:border-white dark:hover:bg-zinc-800 md:w-[158px]"
        href="https://nextjs.org/docs"
      >
        Documentation
      </Link>
    </div>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const [homeVariant, hero, cta] = await Promise.all([
    homePageVariant(code, precomputeFlags),
    heroVariant(code, precomputeFlags),
    ctaVariant(code, precomputeFlags),
  ]);

  const intro =
    homeVariant === "control"
      ? "Welcome — you're on the home page."
      : "You're viewing the variant experience.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{intro}</p>
        <nav className="text-sm">
          <Link
            href="/about"
            className="font-medium text-zinc-950 dark:text-zinc-50 hover:underline"
          >
            About
          </Link>
        </nav>
        <HeroSection variant={hero} />
        <CtaSection variant={cta} />
      </main>
    </div>
  );
}
