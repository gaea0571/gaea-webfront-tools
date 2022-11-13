import fs from "fs";
import path from "path";
import { promisify } from "util";

const no_master_entry_template_path = path.resolve(__dirname, "../../templates/no_master_entry.template.js");
const with_master_entry_template_path = path.resolve(__dirname, "../../templates/with_master_entry.template.js");
const with_master_global_less_path = path.resolve(__dirname, "../../templates/with_master_global_less.template.less");


const source_file_path = path.resolve(process.cwd(), "./src/index.js");
const save_generate_less_path = path.resolve(process.cwd(), "./.framework/global.less");
const save_generate_entry_path = path.resolve(process.cwd(), "./.framework/entry.js");


export default async function generate_entry({ master_provider, namespace }) {
  let template_content;
  if (master_provider) {
    template_content = await promisify(fs.readFile)(with_master_entry_template_path, "utf-8");
  } else {
    template_content = await promisify(fs.readFile)(no_master_entry_template_path, "utf-8");
  };
  // const ast_template_function = template.program(template_content, {
  //   plugins: ["jsx"]
  // });
  // const generate_entry_content = generator(ast);
  await promisify(fs.rm)(path.dirname(save_generate_entry_path), { force: true, recursive: true });
  await promisify(fs.mkdir)(path.dirname(save_generate_entry_path), { recursive: true });
  await promisify(fs.writeFile)(save_generate_entry_path, template_content);

  const global_less_content = await promisify(fs.readFile)(with_master_global_less_path, "utf-8");
  await promisify(fs.writeFile)(save_generate_less_path, global_less_content);
};