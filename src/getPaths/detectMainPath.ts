import { SequencedStop } from ".";

export const detectMainPath = (trips: SequencedStop[][]) => {
	// For now, the main path is the first longest trip
	let mainPathIndex = 0;
	let mainPathLength = 0;
	for (let i = 0; i < trips.length; i++) {
		if (trips[i].length <= mainPathLength) continue;

		mainPathIndex = i;
		mainPathLength = trips[i].length;
	}

	return mainPathIndex;
};
