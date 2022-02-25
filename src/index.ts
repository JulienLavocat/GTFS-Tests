import * as fs from "fs";
import { getPaths } from "./getPaths";
import { GraphGenerator } from "./getPaths/pathToGraph";
import dot from "graphlib-dot";

const lines = ["01-68", "02-68", "03-68", "04-68", "05-68", "10-68"];
// const lines = ["01-68", "02-68"];

const writeFile = (
  line: string,
  filename: string,
  content: any,
  extension = "json"
) =>
  fs.writeFileSync(
    `./results/${line}/${filename}.${extension}`,
    extension === "json" ? JSON.stringify(content, null, 2) : content
  );

(async () => {
  for (const line of lines) {
    console.log("-------- " + line + " --------");
    const start = Date.now();
    const args = JSON.parse(fs.readFileSync(`./args/${line}.json`, "utf-8"));
    const paths = getPaths(args);

    writeFile(line, "paths", paths);
    writeFile(
      line,
      "graph",
      dot.write(new GraphGenerator(paths).getGraph()),
      "dot"
    );

    console.log(`Path ${line} generated in ${Date.now() - start} ms`);
    console.log("");
  }
})();
