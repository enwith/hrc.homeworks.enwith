import { resolve, extname, basename } from "path";
import { readFile, rename } from "fs/promises";
import { setTimeout } from "timers/promises";
import { prepareRandomProfiles } from "./random-profiles.test";
import { IProfile } from "./iprofile.interface";
import { FolderAliases } from "./util/constants";
import { deepReaddir } from "./util/deep-readdir.util";

const isJsonExtname = (path: string): boolean => extname(path) === ".json";

const renameFileByGenderProperty = async (path: string): Promise<void> => {
  const data = await readFile(path);

  let jsonData: IProfile;
  try {
    jsonData = JSON.parse(data.toString());
  } catch (error) {
    console.error(error.message);
    return;
  }
  if (!jsonData.gender) {
    return;
  };

  const dirName = FolderAliases[jsonData.gender];
  const newPath = resolve(__dirname, dirName, basename(path));

  await rename(path, newPath);
};

async function start(): Promise<void> {
  await prepareRandomProfiles(20);
  await setTimeout(5e3); // test

  for (const dirName of ["boys", "girls"]) {
    const files = await deepReaddir(resolve(__dirname, dirName));

    files
      .flat(Number.POSITIVE_INFINITY)
      .filter(isJsonExtname)
      .forEach(renameFileByGenderProperty);
  }
}
start();
