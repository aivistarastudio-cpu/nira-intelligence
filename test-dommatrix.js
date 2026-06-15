if (typeof global.DOMMatrix === "undefined") {
  global.DOMMatrix = class DOMMatrix {
    constructor() { this.a=1; this.b=0; this.c=0; this.d=1; this.e=0; this.f=0; }
  };
}
const fs = require('fs');
const pdfMod = require('pdf-parse');
const ParserClass = pdfMod.PDFParse || pdfMod;
const dummyPdf = Buffer.from(
  "%PDF-1.0\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 3 3]>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000010 00000 n\n0000000053 00000 n\n0000000102 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n149\n%EOF\n",
  "utf-8"
);
async function run() {
  try {
    const parser = new ParserClass({ data: dummyPdf });
    const data = await parser.getText();
    console.log("Success:", data.text);
  } catch(e) {
    console.error("Error:", e);
  }
}
run();
