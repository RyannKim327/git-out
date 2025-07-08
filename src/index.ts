import fs from "fs";
import { exec } from "child_process";
import axios from "axios";
import date from "./date";

let commits: number = Math.floor(Math.random() * 15) + 1;
let _commitments: number = 1;

console.log(`You send git ${commits} commits`);

const run = async (): Promise<void> => {
  const time = date("");
  const m = `${time.getMonth() + 1}-${time.getDate()}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;

  const mm2: string[] = fs.readFileSync("rants.txt", "utf8").split("\n");
  const m2: string[] = fs.readFileSync("questions.txt", "utf8").split("\n");
  const m3: string = m2[Math.floor(Math.random() * m2.length)].replace(
    "__language__",
    "typescript",
  );

  try {
    const { data } = await axios.get<{ response: string }>(
      `https://api-freegpt.onrender.com/api/chat/?message=${encodeURIComponent(m3)}`,
    );

    const datas: string[] = data.response.split("\n");
    let result: string = "";
    let active = false;

    for (const line of datas) {
      if (line.toLowerCase().startsWith("```")) {
        active = !active;
      } else if (active) {
        result += line + "\n";
      }
    }

    const msg: string = mm2[Math.floor(Math.random() * mm2.length)];
    fs.writeFileSync("Auto git.txt", msg, "utf-8");
    fs.writeFileSync("src/autogit.ts", result, "utf-8");

    setTimeout(() => {
      console.log(`-----${_commitments}-----`);
      console.log("Git add");
      exec("git add .", (e) => {
        if (e) return console.error(e);
        setTimeout(() => {
          console.log("Git Commit");
          exec(`git commit -m "${m} [${msg}]"`, (e) => {
            if (e) return console.error(e);
            console.log("Close");
            setTimeout(() => {
              _commitments++;
              commits--;
              if (commits > 0) run();
            }, 50);
          });
        }, 50);
      });
    });
  } catch (e) {
    const msg: string = mm2[Math.floor(Math.random() * mm2.length)];
    fs.writeFileSync("Auto git.txt", msg, "utf-8");
    fs.writeFileSync("src/autogit.ts", "// May error sa API", "utf-8");

    setTimeout(() => {
      console.log(`-----${_commitments}-----`);
      console.log("Git add");
      exec("git add .", (e) => {
        if (e) return console.error(e);
        setTimeout(() => {
          console.log("Git Commit");
          exec(`git commit -m "${m} [${msg}]"`, (e: unknown) => {
            if (e) return console.error(e);
            console.log("Close");
            setTimeout(() => {
              _commitments++;
              commits--;
              if (commits > 0) run();
            }, 50);
          });
        }, 50);
      });
    });
  }
};

console.log(`----- Git Fetch -----`);
exec("git fetch", (e: unknown) => {
  if (e) return console.error(e);
  console.log(`----- Git Pull -----`);
  exec("git pull", (e: unknown) => {
    if (e) return console.error(e);
    exec("git config credential.helper cache", (e: unknown) => {
      if (e) return console.error(`ERR [Helper]: ${e}`);
      run();
    });
  });
});
