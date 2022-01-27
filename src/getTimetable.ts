import { StopTimeTable, TimeTables } from "@iteatime/nextop-library";
import axios from "axios";

export const getTimetable = async (routeId: string) => {
	const url = `https://nextop-api.herokuapp.com/v1/gtfs/6164441b8654610022751b85/timetables?agencyKey=stac&routeId=${routeId}&directionId=0`;

	const res = await axios.get(url);

	return res.data as StopTimeTable;
};
