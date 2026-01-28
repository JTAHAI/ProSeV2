import { CaseBasics } from "@/lib/types";
import { getOtherPartyRole } from "@/lib/partyRoles";

export function buildCoverLetterToClerk(opts: {
  basics: CaseBasics;
  subjectLine: string;
  enclosureNames: string[];
}) {
  const b = opts.basics;

  const docketLine =
    b.caseStage === "post_judgment" && b.docketNumber
      ? `Docket No.: ${b.docketNumber}`
      : `Docket No.: __________________`;

  const enclosures = opts.enclosureNames
    .filter(Boolean)
    .map((name, idx) => `${idx + 1}. ${name}`)
    .join("\n");

  return [
    "COVER LETTER TO CLERK OF COURT",
    "",
    "Date: ____________________",
    "",
    "Clerk of Courts",
    `${b.court.location} (${b.court.division})`,
    "",
    opts.subjectLine,
    `${b.parties.movantName} (${b.parties.movantRole}) v. ${b.parties.otherPartyName} (${getOtherPartyRole(b)})`,
    docketLine,
    "",
    "Dear Clerk:",
    "",
    "Please file the enclosed documents in the above-captioned matter. I am proceeding pro se and submit these documents for filing with the Court.",
    "",
    "Enclosures:",
    enclosures || "(none)",
    "",
    "If any filing fee is required, please notify me. Thank you for your assistance.",
    "",
    "Respectfully submitted,",
    "",
    "______________________________",
    b.parties.movantName,
    "Phone: ________________________",
    "Email: ________________________",
    "Mailing Address: _______________",
    "________________________________",
  ].join("\n");
}
