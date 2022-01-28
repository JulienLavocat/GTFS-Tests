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

export interface Shape {
	entries: string[];
	exits: string[];
	paths: string[][];
}

export function getPaths(timetable: StopTimeTable): Shape[] {
	const { mainPath, trips } = getPathsFromTrips(timetable.services);
	const mainPathIds = mainPath.map((e) => e.stopId);

	if (!trips)
		// Simple line, no branches, loops, etc.
		return [
			{
				entries: [mainPath[0].stopId],
				exits: [mainPath[mainPath.length - 1].stopId],
				paths: [mainPath.map((e) => e.stopId)],
			},
		];

	// Find branches ta start before

	return [];
}
