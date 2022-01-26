import { StopTimeTable } from "@iteatime/nextop-library";
import { difference, intersection, slice } from "lodash";
import { differenceBetweenPaths, getTripsMap } from "./differenceBetweenPaths";
import { getPathsFromTrips } from "./getPathsFromTrips";
import { splitPathsInSections } from "./splitPathsInSections";
import { getTripMap } from "./utils";

export interface SequencedStop {
	stopId: string;
	stopSequence: number;
}

export type Path = [string, number][];

const findSectionsInPath = (path: Path) => {
	const sections: [number, number][] = [];

	let sectionStart = 0;
	for (let i = 1; i < path.length; i++) {
		const previousStopSequence = path[i - 1][1];
		const currentStopSequence = path[i][1];
		if (currentStopSequence - 1 === previousStopSequence) continue;

		sections.push([sectionStart, i - 1]);
		sectionStart = i;
	}

	sections.push([sectionStart, path.length - 1]);
	return sections;
};

export function getPaths(timetable: StopTimeTable) {
	const { mainPath, trips } = getPathsFromTrips(timetable.services);

	const trip = trips[0];
	const mainPathMap = getTripMap(mainPath);
	const tripsMap = getTripsMap(trips);
	const sharedStops = intersection(
		mainPath.map((e) => e.stopId),
		trip.map((e) => e.stopId)
	).map((stopId) => [stopId, mainPathMap[stopId]] as [string, number]);

	const diff = difference(
		trip.map((e) => e.stopId),
		mainPath.map((e) => e.stopId)
	).map((stopId) => [stopId, tripsMap[0][stopId]] as [string, number]);

	const parts = findSectionsInPath(diff);
	const firstSplitOfSection =
		mainPath[mainPath.findIndex((e) => e.stopId === sharedStops[0][0])];

	const sections = [];
	for (const [start, end] of parts) {
		const section: Path = slice(diff, start, end + 1).reverse();
		sections.push([
			[firstSplitOfSection.stopId, firstSplitOfSection.stopSequence],
			...section,
		]);
	}

	// const paths = differenceBetweenPaths(trips, mainPath);

	// const sections = splitPathsInSections(trips, paths, mainPath);

	return { mainPath, sections, maxStopsCount: mainPath.length };
}
