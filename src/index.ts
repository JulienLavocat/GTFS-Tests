import { getTimetable, makeArgs } from "./utils";
import * as fs from "fs";
import { getPaths } from "./getPaths";

(async () => {
  const start = Date.now();
  //   const timetable = await makeArgs("02-68");
  const args = JSON.parse(fs.readFileSync("./args.json", "utf-8"));
  const paths = getPaths(args);
  fs.writeFileSync("./paths.json", JSON.stringify(paths, null, 2));
  console.log(`Path generated in ${Date.now() - start} ms`);
})();
