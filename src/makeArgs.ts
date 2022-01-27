import axios from "axios";
import { getTimetable } from "./getTimetable";
import * as fs from "fs";

const routesUrl =
	"https://nextop-api.herokuapp.com/v1/gtfs/6164441b8654610022751b85/routes?agencyKey=stac&filters=%7B%7D";

async function get(routeId: string) {
	const routes: any[] = (await axios.get(routesUrl)).data;
	const route = routes.find((e) => e.routeId === routeId);
	const timetable = await getTimetable(routeId);

	fs.writeFileSync(
		"./args.json",
		JSON.stringify({ route, timetable }, null, 2)
	);
}

get("03-68");
