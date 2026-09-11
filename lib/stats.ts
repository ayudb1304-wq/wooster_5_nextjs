/* Live figures shown on the landing page. Update the count here when the
   bank grows; every mention on the page renders from this value. */
export const questionBank = {
  count: 10000,
  updated: "2026-09-11",
} as const;

/** "10,000" style, locale fixed so server and client render the same string. */
export const questionCount = questionBank.count.toLocaleString("en-US");
