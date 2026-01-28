from flask import Flask, request, send_file
from fpdf import FPDF
import io

app = Flask(__name__)

class CourtPDF(FPDF):
    def add_court_caption(self, data):
        self.set_font("Helvetica", 'B', 12)
        self.cell(0, 5, "STATE OF MAINE", ln=True, align='C')
        self.cell(0, 5, f"{data.get('courtLocation', '________').upper()} DISTRICT COURT", ln=True, align='C')
        self.cell(0, 5, "FAMILY DIVISION", ln=True, align='C')
        self.ln(10)
        self.cell(100, 5, f"{data.get('movantName', 'Plaintiff')}, Movant")
        self.cell(0, 5, f"DOCKET NO. {data.get('docketNumber', '__________')}", ln=True, align='R')
        self.cell(0, 5, "v.", ln=True)
        self.cell(0, 5, f"{data.get('otherPartyName', 'Defendant')}, Respondent", ln=True)
        self.ln(10)

@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.json
    pdf = CourtPDF()
    pdf.add_page()
    
    # Page 1: Cover Letter
    pdf.set_font("Helvetica", 'B', 16)
    pdf.cell(0, 10, "COVER LETTER TO CLERK", ln=True, align='C')
    pdf.ln(10)
    pdf.set_font("Helvetica", '', 12)
    pdf.multi_cell(0, 7, f"To the Clerk of Court,\n\nPlease find enclosed the following documents for filing in the matter of {data.get('movantName')} v. {data.get('otherPartyName')}.\n\nI am proceeding pro se.")

    # Page 2: The Motion
    pdf.add_page()
    pdf.add_court_caption(data)
    pdf.set_font("Helvetica", 'B', 14)
    pdf.cell(0, 10, "MOTION TO INCORPORATE MEDIATION AGREEMENT", ln=True, align='C')
    pdf.ln(5)
    pdf.set_font("Helvetica", '', 11)
    pdf.multi_cell(0, 6, "Now comes the Movant, proceeding pro se, and respectfully requests that this Court incorporate the mediation agreement dated ________ into a formal Court Order.")

    out = io.BytesIO()
    pdf.output(out)
    out.seek(0)
    return send_file(out, mimetype='application/pdf', as_attachment=True, download_name="MaineCourtPacket.pdf")

import os
import google.generativeai as genai
from flask import Flask, request, jsonify

# Configure Gemini
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

# THE "VAULT" INSTRUCTIONS
MAINE_LAW_PROMPT = (
    "You are the 'For Our Children & Families' Research Assistant. "
    "You ONLY provide information on Maine Family Law, District Court procedures, "
    "and FM-series forms (like FM-002, FM-101, FM-004). "
    "If asked about anything else, say: 'I am limited to Maine Family Law research only.' "
    "Cite Maine Revised Statutes Title 19-A when possible. DO NOT provide legal advice."
)

@app.route('/api/research', methods=['POST'])
def legal_research():
    try:
        user_query = request.json.get("query")
        model = genai.GenerativeModel(
            model_name='gemini-1.5-flash', 
            system_instruction=MAINE_LAW_PROMPT
        )
        response = model.generate_content(user_query)
        return jsonify({"answer": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def build_cover_letter(basics, subject, enclosures):
    # Updated to formal 'proceeding pro se' tone [cite: 331]
    lines = [
        f"FOR OUR CHILDREN & FAMILIES - FILING ASSISTANCE",
        "",
        f"RE: {subject}",
        "",
        "To the Clerk of Court:",
        "",
        f"I, {basics['parties']['movantName']}, am proceeding pro se in the above-captioned matter.",
        "Please find the enclosed documents for filing:",
    ]
    # ... logic for enclosures (FM-101, FM-002, FM-005) [cite: 331]
