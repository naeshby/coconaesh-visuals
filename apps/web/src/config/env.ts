const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!rawApiBaseUrl) {
  throw new Error(
    "VITE_API_BASE_URL is not set. Copy .env.example to .env in the repository root and restart Vite.",
  );
}

export const env = {
  // Strip trailing slashes so path joining stays predictable.
  apiBaseUrl: rawApiBaseUrl.replace(/\/+$/, ""),
} as const;