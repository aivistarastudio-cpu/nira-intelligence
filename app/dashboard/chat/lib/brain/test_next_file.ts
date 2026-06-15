async function test() {
  const { File } = require("next/dist/compiled/@edge-runtime/primitives/fetch");
  const f = new File(["test content"], "test.pdf", { type: "application/pdf" });
  console.log("Reading first time...");
  const b1 = await f.arrayBuffer();
  console.log("b1:", b1.byteLength);
  console.log("Reading second time...");
  try {
    const b2 = await f.arrayBuffer();
    console.log("b2:", b2.byteLength);
  } catch (e) {
    console.error("Failed second time:", e.message);
  }
}
test();
