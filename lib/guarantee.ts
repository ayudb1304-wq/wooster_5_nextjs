/* The score guarantee copy. The page shows every line; the landing page shows
   the title and lead of each point. */

export type Line = string | { pull: string; em: string };

export type Point = {
  title: string;
  lead: string;
  lines: Line[];
};

export const guaranteeTitle = "100 points higher, or the course again for free.";

export const guaranteePromise =
  "Here is the promise, in one sentence, because a promise that needs three paragraphs usually isn’t one: if your official SAT score is 1300 or below, we guarantee your next official score will be at least 100 points higher, or you take the whole course again for free.";

const scalePull = { pull: "We asked.", em: "The scale said no." };

export const guaranteePoints: Point[] = [
  {
    title: "Why anyone would promise that",
    lead: "We wanted a number.",
    lines: [
      "Most test prep companies promise “results.” Results is a lovely word. It can mean anything, which is why it’s so popular.",
      "The entire Wooster Prep method is built on numbers. It would be awkward to go vague on the one that matters most.",
      "The method ignores the concepts that look important and goes after the ones that pay out. That turns out to be very predictable.",
      "Predictable enough to put 100 points on it, which our accountant describes as “brave” in a tone that suggests she means something else.",
    ],
  },
  {
    title: "Why 1300",
    lead: "Because math.",
    lines: [
      "The SAT tops out at 1600. If you scored 1300 or below, there is plenty of room above you, and we know exactly which parts of it are easiest to grab.",
      "If you scored a 1590, you are very welcome here. We cannot in good conscience promise you a 1690.",
      scalePull,
      "The course works at every level. Sitting at 1450 and want 1550? Come on in. We’ll get you there without a signed promise, the same way we’d get you across the street without one.",
      "Above 1300 the guarantee would eventually run into a wall. The wall is called 1600, and it does not move.",
    ],
  },
  {
    title: "How it works",
    lead: "Bring a real score. Do the course. Actually do it.",
    lines: [
      "Your most recent official SAT score. Not the one you remember getting “that one time,” and not the one your cousin got.",
      "If your new score isn’t at least 100 points higher, do the course again for free.",
      "We won’t argue. We might sulk a little.",
    ],
  },
];

export const guaranteeAudiences = [
  {
    title: "For parents",
    body: [
      "You are about to spend money on a promise made by a company whose founder opens his own biography with “bad at exams.” Fair. That’s exactly why the guarantee exists. You don’t have to take anyone’s word for anything: your kid brings a real score, does the work, and the College Board does the grading. If the number doesn’t move, you retake the course for free.",
    ],
  },
  {
    title: "For students",
    body: [
      "100 points sounds like a lot. It’s somewhere in the neighborhood of 10 questions across the whole test, which is a very different way to hear it. We know which 10. That’s the entire business. You bring the time, we bring the order, and if it somehow doesn’t work, have another go. Either way you’ll walk out knowing more about the SAT than the SAT would prefer, which is the closest thing to revenge a standardized test allows.",
    ],
  },
];
