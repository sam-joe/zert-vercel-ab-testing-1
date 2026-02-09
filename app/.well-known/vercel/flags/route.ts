import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";
import {
  homePageVariant,
  aboutPageVariant,
  heroVariant,
  ctaVariant,
} from "@/flags";

const flags = {
  homePageVariant,
  aboutPageVariant,
  heroVariant,
  ctaVariant,
};

export const GET = createFlagsDiscoveryEndpoint(async () =>
  getProviderData(flags)
);
