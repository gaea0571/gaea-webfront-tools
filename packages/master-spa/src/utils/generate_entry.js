import fs from "fs";
import path from "path";
import { promisify } from "util";
// import template from "@babel/template";
// import generator from "@babel/generator";
// import { stringLiteral } from "@babel/types";

const entry_template_path = path.resolve(__dirname, "../../templates/entry.template.js");

// const source_file_path = path.resolve(process.cwd(), "./src/index.js");
const save_generate_entry_path = path.resolve(process.cwd(), "./.framework/entry.js");


export default async function generate_entry() {
  const template_content = await promisify(fs.readFile)(entry_template_path, "utf-8");
  // const ast_template_function = template.program(template_content, {
  //   plugins: ["jsx"]
  // });
  // const ast = ast_template_function({
  //   ENTRY_FILE_ABSOLUTE_PATH: stringLiteral(source_file_path)
  // });
  // const generate_entry_content = generator(ast);
  await promisify(fs.rm)(path.dirname(save_generate_entry_path), { force: true, recursive: true });
  await promisify(fs.mkdir)(path.dirname(save_generate_entry_path), { recursive: true });
  await promisify(fs.writeFile)(save_generate_entry_path, template_content);
};