import { exec } from "child_process";
import path from "path";
import { env } from "./env";
const is_win = require("os").type() === "Windows_NT";

function simulate(key: string) {
  exec(
    `"${path.join(env.executableDir, "ctrl.exe")}" ${key}`,
    (err: any, stdout: any, stderr: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(key);
      }
    }
  );
}

function simulateCopy() {
  simulate("C");
}

function simulatePaste() {
  simulate("V");
}

function simulateMac(script: string) {
  exec(
    `osascript ${path.join(env.executableDir, script)}`,
    (err: any, stdout: any, stderr: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(script);
      }
    }
  );
}

export default {
  copy: is_win ? simulateCopy : () => simulateMac("ctrl_c.scpt"),
  paste: is_win ? simulatePaste : () => simulateMac("ctrl_v.scpt")
};
