export type CaseBasics = {
  court: {
    location: string; // City (e.g., Biddeford)
    division: "District Court (Family Division)" | "Superior Court";
  };
  caseStage: "new" | "post_judgment";
  docketNumber?: string;
  parties: {
    movantName: string;
    otherPartyName: string;
    movantRole: "Plaintiff/Petitioner" | "Defendant/Respondent";
  };
};
