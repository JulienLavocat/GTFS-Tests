import { Path, SequencedStop } from ".";
import _ from "lodash";

export const splitPathsInSections = (
	trips: SequencedStop[][],
	paths: { difference: Path; intersection: Path }[],
	mainPath: SequencedStop[]
) => {
	const splitPaths: Path[][] = [];
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

	const sections = [];
	const sectionsHash = new Set<string>();

	for (let i = 0; i < paths.length; i++) {
		const { difference, intersection } = paths[i];
		const parts = findSectionsInPath(difference);

		for (const [start, end] of parts) {
			const section: Path = _.slice(difference, start, end + 1).reverse();
			const previousStops = intersection.filter(
				(e) => e[1] <= section[0][1]
			);
			console.log(trips[i].find((e) => e.stopId === section[0][0]));

			const hash = section.map(([id]) => id).join();
			if (sectionsHash.has(hash)) continue;

			sections.push(section);
			sectionsHash.add(hash);
		}

		splitPaths.push(sections);
	}

	return sections.map((e) =>
		e.map(([stopId, stopSequence]) => ({ stopId, stopSequence }))
	) as SequencedStop[][];
};
