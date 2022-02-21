import { StopTimeTable, TimeTables } from "@iteatime/nextop-library";
import axios from "axios";
import * as fs from "fs";

export const getTimetable = async (routeId: string) => {
  const url = `https://nextop-api.herokuapp.com/v1/gtfs/6164441b8654610022751b85/timetables?agencyKey=stac&routeId=${routeId}&directionId=0`;

  const res = await axios.get(url);

  return res.data as StopTimeTable;
};

const routesUrl =
  "https://nextop-api.herokuapp.com/v1/gtfs/6164441b8654610022751b85/routes?agencyKey=stac&filters=%7B%7D";

export async function makeArgs(routeId: string) {
  const routes: any[] = (await axios.get(routesUrl)).data;
  const route = routes.find((e) => e.routeId === routeId);
  const timetable = await getTimetable(routeId);

  fs.writeFileSync(
    "./args.json",
    JSON.stringify({ route, timetable }, null, 2)
  );
}
