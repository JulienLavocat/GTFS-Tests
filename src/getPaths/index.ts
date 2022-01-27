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

export function getPaths(timetable: StopTimeTable): {
	paths: { paths?: string[][]; mergeAt: string; continueTo: string }[];
	mainPath: SequencedStop[];
} {
	const paths = getPathsFromTrips(timetable.services);
	const trips = [paths.mainPath, ...paths.trips];

	const mainPathIds = paths.mainPath.map((e) => e.stopId);

	if (trips.length < 2) {
		// It's a simple line, with no other routes associated
		return {
			paths: [],
			mainPath: paths.mainPath,
		};
	}

	const extractPathFromSplit = (array: string[], common: string) => {
		const mainPathId = mainPathIds[mainPathIds.indexOf(common) - 1];
		const part = array.slice(0, array.indexOf(common));
		if (part[part.length - 1] === mainPathId) part.splice(-1);

		return part;
	};

	const getStartingSplit = () => {
		const split = {
			paths: [] as string[][],
			mergeAt: "",
			continueTo: "",
		};
		for (let i = 0; i < trips.length; i++) {
			const currentTrip = trips[i];

			for (let j = 0; j < trips.length; j++) {
				if (j === i) continue;

				const otherTrip = trips[j];

				const currentIds = currentTrip.map((e) => e.stopId);
				const otherIds = otherTrip.map((e) => e.stopId);
				const commonStops = intersection(currentIds, otherIds);
				const currentPart = extractPathFromSplit(
					currentIds,
					commonStops[0]
				);

				split.paths.push(currentPart);
				split.mergeAt = commonStops[0];
				split.continueTo = commonStops[commonStops.length - 1];
			}
		}

		return split;
	};

	const startingSplit = getStartingSplit();

	const path = [startingSplit];

	// Maybe find the "continuesTo" index for each routes, slice the array at this point until the end
	// and re-apply the same logic for "getStartingSplit"

	return { paths: path, mainPath: paths.mainPath };
}
