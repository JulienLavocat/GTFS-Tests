import { getTimetable } from "./getTimetable";
import * as fs from "fs";
import { getPaths } from "./getPaths";

(async () => {
	const start = Date.now();
	const timetable = await getTimetable("01-68");
	const paths = getPaths(timetable);
	fs.writeFileSync("./paths.json", JSON.stringify(paths, null, 2));
	console.log(`Path generated in ${Date.now() - start} ms`);
})();
