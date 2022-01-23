import { StopTimeTable } from "@iteatime/nextop-library";
import { differenceBetweenPaths } from "./differenceBetweenPaths";
import { getPathsFromTrips } from "./getPathsFromTrips";
import { splitPathsInSections } from "./splitPathsInSections";

export interface SequencedStop {
	stopId: string;
	stopSequence: number;
}

export type Path = [string, number][];

export function getPaths(timetable: StopTimeTable) {
	const { mainPath, trips } = getPathsFromTrips(timetable.services);

	const paths = differenceBetweenPaths(trips, mainPath);

	const sections = splitPathsInSections(trips, paths, mainPath);

	return { mainPath, sections, maxStopsCount: mainPath.length };
}
