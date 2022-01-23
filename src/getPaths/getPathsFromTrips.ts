import { StopTimeTable } from "@iteatime/nextop-library";
import { SequencedStop } from ".";
import { detectMainPath } from "./detectMainPath";

/**
 * List all paths in a route from services
 * @param services
 * @returns SequencedStop[][]
 */
export const getPathsFromTrips = (services: StopTimeTable["services"]) => {
	const trips: SequencedStop[][] = [];
	const tripsSet = new Set<string>();

	Object.values(services)
		.map((service) =>
			Object.values(service.trips).map((trip) => trip.stopTimes || [])
		)
		.flat(1)
		.map((stopTimes) =>
			stopTimes
				.map(({ stopId, stopSequence }) => ({
					stopId,
					stopSequence,
				}))
				.sort((a, b) => a.stopSequence - b.stopSequence)
		)
		.forEach((trip) => {
			const tripHash = trip.map((e) => e.stopId).join();
			if (tripsSet.has(tripHash)) return;

			tripsSet.add(tripHash);
			trips.push(trip);
		});

	const mainPathIndex = detectMainPath(trips);
	const mainPath = trips[mainPathIndex];
	trips.splice(mainPathIndex, 1);

	return { mainPath, trips };
};
