import type { ObjectEncodingOptions } from "fs";
import { lstat, readdir } from "fs/promises";
import { resolve } from "path";

type ReaddirOptions =
  | (ObjectEncodingOptions & { withFileTypes?: false | undefined })
  | BufferEncoding
  | null;

export async function deepReaddir(
  dirPath: string,
  options?: ReaddirOptions
): Promise<RecursiveArray<string>> {
  const files = (await readdir(dirPath, options)).map(async (file) => {
    const filePath = resolve(dirPath, file);
    const fileStat = await lstat(filePath);

    return fileStat.isDirectory() ? deepReaddir(filePath, options) : filePath;
  });

  return Promise.all(files);
}
