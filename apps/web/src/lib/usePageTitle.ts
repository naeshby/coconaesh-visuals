import { useEffect } from "react";
import { siteName } from "../config/site";

/** Sets the browser tab title for the current page. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${siteName}` : siteName;
  }, [title]);
}