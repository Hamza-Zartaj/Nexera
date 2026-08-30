import fs from "fs/promises";
import pdfParse from "pdf-parse";

export const parsePdfText = async (filePath) => {
  const buffer = await fs.readFile(filePath);
  const data = await pdfParse(buffer);
  return data.text?.trim() || "";
};
