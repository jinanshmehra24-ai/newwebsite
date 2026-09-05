import { useEffect } from "react";
import { siteConfig } from "../config/site";

type SeoOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  /** JSON-LD structured data injected for this route. */
  jsonLd?: Record<string, unknown>;
  /** Keeps the route out of search results and drops its canonical link. */
  noindex?: boolean;
};

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [key, val] = selector.replace(/^meta\[|\]$/g, "").split("=");
    el.setAttribute(key, val.replace(/["']/g, ""));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

export function useSeo({
  title,
  description,
  path,
  image,
  jsonLd,
  noindex = false,
}: SeoOptions) {
  useEffect(() => {
    const fullTitle = title
      ? siteConfig.seo.titleTemplate.replace("%s", title)
      : siteConfig.seo.defaultTitle;
    const desc = description ?? siteConfig.seo.defaultDescription;
    const url = `${siteConfig.url}${path ?? ""}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[property="og:url"]', "content", url);
    if (image) setMeta('meta[property="og:image"]', "content", `${siteConfig.url}${image}`);

    setMeta('meta[name="robots"]', "content", noindex ? "noindex, follow" : "index, follow");

    const canonical =
      document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (noindex) {
      canonical?.remove();
    } else if (canonical) {
      canonical.href = url;
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = url;
      document.head.appendChild(link);
    }

    if (!jsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.route = "true";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => script.remove();
  }, [title, description, path, image, jsonLd, noindex]);
}
