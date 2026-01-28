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

export function buildIncorporateAgreementPreview(b: CaseBasics) {
  const cap = caption(b);

  const motionTitle = "MOTION TO INCORPORATE MEDIATION AGREEMENT INTO ORDER";
  const orderTitle =
    "PROPOSED ORDER ON MOTION TO INCORPORATE MEDIATION AGREEMENT";

  const intro = `NOW COMES ${b.parties.movantName} (${b.parties.movantRole}), proceeding pro se, and respectfully requests that the Court incorporate the parties’ mediation agreement into a court order.`;

  const motion = [
    cap,
    "",
    motionTitle,
    "",
    intro,
    "",
    "1. The parties participated in mediation and reached a written agreement regarding parental rights and responsibilities and/or parent-child contact.",
    "2. The agreement is signed by the parties and is attached as an exhibit (or will be filed with this motion).",
    "3. The undersigned requests that the Court adopt and incorporate the agreement into an order so that its terms are enforceable as an order of the Court.",
    "",
    "WHEREFORE, the undersigned requests that the Court:",
    "A. Incorporate the parties’ mediation agreement into a court order; and",
    "B. Grant such other and further relief as the Court deems appropriate.",
    "",
    "Dated: ____________________",
    "",
    "______________________________",
    b.parties.movantName,
  ].join("\n");

  const proposedOrder = [
    cap,
    "",
    orderTitle,
    "",
    "After consideration of the Motion to Incorporate Mediation Agreement, it is hereby ORDERED:",
    "",
    "1. The parties’ mediation agreement is adopted and incorporated into this Order.",
    "2. The parties shall comply with all incorporated terms.",
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
    { name: "Motion to Incorporate Mediation Agreement into Order", content: motion },
    { name: "Proposed Order on Motion to Incorporate Mediation Agreement", content: proposedOrder },
    { name: "Certificate of Service", content: cos },
  ];

  const cover = buildCoverLetterToClerk({
    basics: b,
    subjectLine: "Re: Filing – Family Matter",
    enclosureNames: coreDocs.map((d) => d.name),
  });

  return {
    motionType: "incorporate_agreement" as const,
    documents: [{ name: "Cover Letter to Clerk of Court", content: cover }, ...coreDocs],
    notes: [
      "This application provides general information and drafting assistance. It is not a lawyer and does not provide legal advice.",
      "If your agreement is not already filed with the court, attach it as an exhibit.",
      "You are typically responsible for serving the other party with your filing. Review Maine court rules and any specific court instructions for service requirements.",
    ],
  };
}
