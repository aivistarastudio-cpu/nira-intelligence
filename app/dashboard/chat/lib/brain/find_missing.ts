import * as fs from "fs";

const recoveredFile = "/Users/heenatewani/Desktop/nira-intelligence/nira-intelligence/app/dashboard/chat/lib/brain/niraCore_recovered.ts";
const lines = fs.readFileSync(recoveredFile, "utf8").split("\n");

let missing = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("MISSING LINE")) {
    missing.push(i + 1);
  }
}

console.log("Missing lines:", missing);
