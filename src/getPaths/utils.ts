import { SequencedStop } from ".";

export const getTripMap = (trips: SequencedStop[]): Record<string, number> => {
	return Object.fromEntries(
		trips.map(({ stopId, stopSequence }) => [stopId, stopSequence])
	);
};
