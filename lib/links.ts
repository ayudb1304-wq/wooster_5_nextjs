export const links = {
  diagnostic: "https://woosterprep.com/diagnostic",
  login: "https://woosterprep.com/login",
  blog: "https://woosterprep.com/blog",
  privacy: "https://woosterprep.com/privacy",
  terms: "https://woosterprep.com/terms",
  disclaimer: "https://woosterprep.com/disclaimer",
  email: "mailto:hal@woosterprep.com",
  careers: "https://woosterprep.com/careers",
} as const;

/* Placeholder handles until the accounts exist. */
export const socials = [
  { label: "Instagram", href: "https://instagram.com/woosterprep" },
  { label: "X", href: "https://x.com/woosterprep" },
  { label: "YouTube", href: "https://youtube.com/@woosterprep" },
  { label: "LinkedIn", href: "https://linkedin.com/company/woosterprep" },
  { label: "TikTok", href: "https://tiktok.com/@woosterprep" },
] as const;

export const film = {
  src: "/assets/moneyball-web.mp4",
  poster: "/assets/moneyball-poster.jpg",
} as const;
