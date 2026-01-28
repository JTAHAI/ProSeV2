import { CaseBasics } from "./types";

export function getOtherPartyRole(b: CaseBasics) {
  return b.parties.movantRole === "Plaintiff/Petitioner"
    ? "Defendant/Respondent"
    : "Plaintiff/Petitioner";
}
