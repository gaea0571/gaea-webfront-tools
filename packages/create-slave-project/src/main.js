import changeJsonFile from "@/methods/changeJsonFile";
import inputPackageName from "@/methods/inputPackageName";
import downloadTemplate from "@/methods/downloadTemplate";


(async () => {
  try {
    const packageName = await inputPackageName();
    await downloadTemplate({
      folderName: packageName,
      remote: "https://github.com/gaea0571/slave-spa-project-template.git"
    });
    await changeJsonFile({
      folderName: packageName,
      projectName: packageName
    });
  } catch (error) {
    throw error;
  };
})();