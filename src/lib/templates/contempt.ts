import { CaseBasics } from "@/lib/types";
import { getOtherPartyRole } from "@/lib/partyRoles";
import { buildCoverLetterToClerk } from "@/lib/templates/coverLetter";

function caption(b: CaseBasics) {
  const courtLine = `${b.court.location} — ${b.court.division}`;
  const docket =
    b.caseStage === "post_judgment" && b.docketNumber
      ? `Docket No.: ${b.docketNumber}`
      : `Docket No.: __________________`;

  return [
    courtLine,
    "",
    `${b.parties.movantName},`,
    `    ${b.parties.movantRole},`,
    "v.",
    `${b.parties.otherPartyName},`,
    `    ${getOtherPartyRole(b)}.`,
    "",
    docket,
  ].join("\n");
}

function certificateOfService(b: CaseBasics) {
  const otherRole = getOtherPartyRole(b);
  return [
    caption(b),
    "",
    "CERTIFICATE OF SERVICE",
    "",
    "I certify that on the date written below, I served a copy of the foregoing filing and any attachments on the other party by:",
    "",
    "[  ] First-class mail to: ________________________________________________",
    "                              ________________________________________________",
    "",
    "[  ] Hand delivery to: _________________________________________________",
    "",
    "[  ] Email (if previously agreed/ordered): ______________________________",
    "",
    `Served on: ${b.parties.otherPartyName} (${otherRole})`,
    "",
    "Dated: ____________________",
    "",
    "______________________________",
    b.parties.movantName,
  ].join("\n");
}

export function buildContemptPreview(b: CaseBasics) {
  const cap = caption(b);

  const motionTitle = "MOTION FOR CONTEMPT";
  const affTitle = "AFFIDAVIT IN SUPPORT OF MOTION FOR CONTEMPT";
  const orderTitle = "PROPOSED ORDER ON MOTION FOR CONTEMPT";

  const intro = `NOW COMES ${b.parties.movantName} (${b.parties.movantRole}), proceeding pro se, and respectfully moves this Court for an Order finding the other party in contempt for violation of a court order.`;

  const motion = [
    cap,
    "",
    motionTitle,
    "",
    intro,
    "",
    "ORDER TO BE ENFORCED",
    "1. Date of Order: ____________________",
    "2. Title/Type of Order: _________________________________________________",
    "",
    "ALLEGED VIOLATIONS (describe each violation and the date(s))",
    "1. ______________________________________________________________________",
    "   Date(s): ____________________  Evidence/Details: ______________________",
    "",
    "2. ______________________________________________________________________",
    "   Date(s): ____________________  Evidence/Details: ______________________",
    "",
    "RELIEF REQUESTED",
    "The undersigned requests that the Court:",
    "A. Find the other party in contempt;",
    "B. Order compliance going forward;",
    "C. Order make-up time / specific enforcement terms (if applicable): _______",
    "D. Award such other relief as the Court deems appropriate.",
    "",
    "Dated: ____________________",
    "",
    "______________________________",
    b.parties.movantName,
  ].join("\n");

  const affidavit = [
    cap,
    "",
    affTitle,
    "",
    `I, ${b.parties.movantName}, being sworn/affirmed, state the following is true to the best of my knowledge:`,
    "",
    "1. I am a party to this case.",
    "2. The Court issued an order that applies to the other party.",
    "3. The other party has violated the order as follows (include facts, dates, and what you observed):",
    "",
    "   ______________________________________________________________________",
    "   ______________________________________________________________________",
    "   ______________________________________________________________________",
    "",
    "4. I request the Court enforce the order and grant appropriate relief.",
    "",
    "Dated: ____________________",
    "",
    "______________________________",
    b.parties.movantName,
    "",
    "STATE OF MAINE",
    "COUNTY OF ____________________",
    "",
    "Subscribed and sworn/affirmed before me on ____________________.",
    "",
    "______________________________",
    "Notary Public / Attorney / Other authorized official",
    "My commission expires: ____________________",
  ].join("\n");

  const proposedOrder = [
    cap,
    "",
    orderTitle,
    "",
    "After consideration of the Motion for Contempt, it is hereby ORDERED:",
    "",
    "1. [  ] The motion is DENIED.",
    "2. [  ] The motion is GRANTED and the Court finds the other party in contempt for violation of the Court’s order dated ____________________.",
    "3. [  ] The other party shall comply with the order immediately and going forward.",
    "4. [  ] Additional enforcement terms (if any): ____________________________",
    "",
    "SO ORDERED.",
    "",
    "Dated: ____________________",
    "",
    "______________________________",
    "Judge / Justice",
  ].join("\n");

  const cos = certificateOfService(b);

  const coreDocs = [
    { name: "Motion for Contempt", content: motion },
    { name: "Affidavit in Support of Motion for Contempt", content: affidavit },
    { name: "Proposed Order on Motion for Contempt", content: proposedOrder },
    { name: "Certificate of Service", content: cos },
  ];

  const cover = buildCoverLetterToClerk({
    basics: b,
    subjectLine: "Re: Filing – Motion for Contempt (Family Matter)",
    enclosureNames: coreDocs.map((d) => d.name),
  });

  return {
    motionType: "contempt" as const,
    documents: [{ name: "Cover Letter to Clerk of Court", content: cover }, ...coreDocs],
    notes: [
      "This application provides general information and drafting assistance. It is not a lawyer and does not provide legal advice.",
      "Contempt generally requires a judge-signed court order. If you only have a mediation agreement not yet adopted into an order, use the Motion to Incorporate first.",
      "Be specific with dates and facts. Attach exhibits if available (messages, calendars, receipts, etc.).",
    ],
  };
}
