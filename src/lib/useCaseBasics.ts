"use client";

import { useState } from "react";
import { CaseBasics } from "./types";

export function useCaseBasics() {
  const [caseBasics, setCaseBasics] = useState<CaseBasics>({
    court: {
      location: "",
      division: "District Court (Family Division)",
    },
    caseStage: "new",
    parties: {
      movantName: "",
      otherPartyName: "",
movantRole: "Plaintiff/Petitioner",
    },
  });

  return { caseBasics, setCaseBasics };
}
