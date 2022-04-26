import type { ObjectEncodingOptions } from 'fs';
import { join, resolve, extname, basename } from 'path';
import {
  writeFile,
  access,
  mkdir,
  readdir,
  lstat,
  readFile,
  rename,
} from 'fs/promises';
import { setTimeout } from 'timers/promises';

// recursive readdir

type ReaddirOptions =
  | (ObjectEncodingOptions & { withFileTypes?: false | undefined })
  | BufferEncoding
  | null;

type RecursiveArray<T> = Array<T | RecursiveArray<T>>;

async function deepReaddir(
  dirPath: string,
  options?: ReaddirOptions
): Promise<RecursiveArray<string>> {
  const files = (await readdir(dirPath, options))
    .map(async (file) => {
      const filePath = resolve(dirPath, file);
      const fileStat = await lstat(filePath);

      return fileStat.isDirectory() ? deepReaddir(filePath, options) : filePath;
    });

  return Promise.all(files);
};

//

interface IProfile {
  id: string;
  name: string;
  gender: Gender;
}

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

const FolderAliases = {
  [Gender.MALE]: 'boys',
  [Gender.FEMALE]: 'girls',
} as const;

const isJsonExtname = (path: string): boolean => extname(path) === '.json';

const renameFileByGenderProperty = async (path: string): Promise<void> => {
  const data = await readFile(path);

  let jsonData: IProfile;
  try {
    jsonData = JSON.parse(data.toString())
  } catch (error) {
    console.error(error.message);
    return;
  }

  if (!jsonData.gender) return;

  const dirName = FolderAliases[jsonData.gender];
  const newPath = resolve(__dirname, dirName, basename(path));

  await rename(path, newPath);
};

async function start(): Promise<void> {
  await prepareRandomProfiles(20); await setTimeout(5e3); // test

  for (const dirName of ['boys', 'girls']) {
    const files = await deepReaddir(resolve(__dirname, dirName));

    files
      .flat(Number.POSITIVE_INFINITY)
      .filter(isJsonExtname)
      .forEach(renameFileByGenderProperty);
  }
}
start();




// function for test

async function prepareRandomProfiles(amount: number) {
  const profileNames: readonly string[] = [
    'Вера',
    'Борис',
    'Вышемир',
    'Люба',
    'Мирослав',
    'Вадим',
    'Светоcлав',
    'Людмила',
    'Богдан',
    'Надежда',
  ];

  const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomGender = (): Gender => randomInt(0, 1) ? Gender.FEMALE : Gender.MALE;

  for (let i = amount; i--;) {
    const id = Math.random().toString(36).slice(2);

    const profile: IProfile = {
      id,
      gender: randomGender(),
      name: profileNames[randomInt(0, profileNames.length - 1)],
    };

    const jsonString = JSON.stringify(profile, null, 2);

    const dirPath = resolve(__dirname, FolderAliases[randomGender()]);
    const filePath = join(dirPath, `${id}.json`);

    try {
      await access(dirPath);
    } catch (error) {
      await mkdir(dirPath);
    }

    await writeFile(filePath, jsonString);
  }
}
