import { StopTimeTable, TimeTables } from "@iteatime/nextop-library";
import axios from "axios";

export const getTimetable = async () => {
	// const url = "http://localhost:4000/v1/gtfs/61e7c73396ba42367e34cd95/timetables?agencyKey=stac&routeId=02-68&directionId=0";
	const url =
		"https://nextop-api.herokuapp.com/v1/gtfs/6164441b8654610022751b85/timetables?agencyKey=stac&routeId=02-68&directionId=0";

	const res = await axios.get(url);

	return res.data as StopTimeTable;
};
