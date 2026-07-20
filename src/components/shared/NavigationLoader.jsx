"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);

  // When the path or query changes, navigation is complete
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e) => {
      // Find the closest anchor tag
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore links that open in a new tab, or use modifier keys
      if (
        anchor.target === "_blank" ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Ignore absolute external links, mailto, tel, etc.
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      // Ignore links that are meant for downloading files
      if (anchor.hasAttribute("download")) {
        return;
      }

      try {
        const targetUrl = new URL(anchor.href);
        const currentUrlObj = new URL(window.location.href);

        // If it's the same origin
        if (targetUrl.origin === currentUrlObj.origin) {
          // If it's exactly the same path and query, don't load (e.g. hash links)
          if (
            targetUrl.pathname === currentUrlObj.pathname &&
            targetUrl.search === currentUrlObj.search
          ) {
            return;
          }

          // It's a different route on the same domain, show loading!
          setIsNavigating(true);
        }
      } catch (err) {
        // Fallback
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!isNavigating) return null;

  return <Loading />;
}
