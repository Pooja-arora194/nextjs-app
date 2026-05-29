import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "data/users.json"
);

export const readUsers = () => {
  const data = fs.readFileSync(
    filePath,
    "utf8"
  );

  return JSON.parse(data);
};

export const writeUsers = (users) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(users, null, 2)
  );
};