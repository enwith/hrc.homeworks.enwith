import { Gender } from "../gender.enum";

export const FolderAliases: Readonly<Record<Gender, string>> = {
  [Gender.MALE]: "boys",
  [Gender.FEMALE]: "girls",
};
