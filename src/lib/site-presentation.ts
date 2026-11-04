import { cache } from "react";
import { getSiteSettings } from "@/lib/cms/settings";
// Deduplicate presentation reads within a render; the CMS implementation stays unchanged.
export const getPresentationSettings = cache(getSiteSettings);
