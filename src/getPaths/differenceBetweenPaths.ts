import { Path, SequencedStop } from ".";
import _ from "lodash";

export const getTripsMap = (trips: SequencedStop[][]) => {
	const tripsMap: Record<string, number>[] = [];
	trips.forEach((stops) =>
		tripsMap.push(
			Object.fromEntries(
				stops.map(({ stopId, stopSequence }) => [stopId, stopSequence])
			)
		)
	);

	return tripsMap;
};

export const differenceBetweenPaths = (
	trips: SequencedStop[][],
	mainPath: SequencedStop[]
) => {
	const tripsMap = getTripsMap(trips);
	const mainPathIds = mainPath.map((e) => e.stopId);
	_;
	const paths: { difference: Path; intersection: Path }[] = [];
	for (let i = 0; i < trips.length; i++) {
		const tripIds = Object.keys(tripsMap[i]);

		const difference: Path = _.difference(tripIds, mainPathIds).map(
			(stopId) => [stopId, tripsMap[i][stopId]]
		) as Path;

		const intersection = _.intersection(tripIds, mainPathIds).map(
			(stopId) => [stopId, tripsMap[i][stopId]]
		) as Path;

		paths.push({ difference, intersection });
	}

	return paths;
};
