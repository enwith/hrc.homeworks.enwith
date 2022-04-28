import { access, mkdir, writeFile } from "fs/promises";
import { resolve } from "path";
import { Gender } from "./gender.enum";
import { IProfile } from "./iprofile.interface";
import { FolderAliases } from "./util/constants";

export async function prepareRandomProfiles(amount: number) {
  const profileNames: readonly string[] = [
    "Вера",
    "Борис",
    "Вышемир",
    "Люба",
    "Мирослав",
    "Вадим",
    "Светоcлав",
    "Людмила",
    "Богдан",
    "Надежда",
  ];

  const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomGender = (): Gender =>
    randomInt(0, 1) ? Gender.FEMALE : Gender.MALE;

  for (let i = amount; i--; ) {
    const id = Math.random().toString(36).slice(2);

    const profile: IProfile = {
      id,
      gender: randomGender(),
      name: profileNames[randomInt(0, profileNames.length - 1)],
    };

    const jsonString = JSON.stringify(profile, null, 2);

    const dirPath = resolve(__dirname, FolderAliases[randomGender()]);
    const filePath = resolve(dirPath, `${id}.json`);

    try {
      await access(dirPath);
    } catch (error) {
      await mkdir(dirPath);
    }

    await writeFile(filePath, jsonString);
  }
}
