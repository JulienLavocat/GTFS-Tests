import {
  ConfiguredRoute,
  StopTime,
  StopTimeTable,
} from "@iteatime/nextop-library";

function transformStopId({ stopId }: StopTime) {
  return isNaN(+stopId.slice(-2)) ? stopId : stopId.slice(0, stopId.length - 1);
}

function getUniqueTrips({ services }: StopTimeTable) {
  const tripsHashes = new Set<string>();
  const trips: string[][] = [];
  Object.values(services)
    .map(({ trips }) => Object.values(trips))
    .flat()
    .forEach(({ stopTimes }) => {
      if (!stopTimes) return;
      const hash = stopTimes
        .sort((a, b) => a.stopSequence - b.stopSequence)
        .map(transformStopId)
        .join(";");
      if (tripsHashes.has(hash)) return;

      tripsHashes.add(hash);
      trips.push(hash.split(";"));
    });
  return trips;
}

export function getPaths({
  route,
  timetable,
}: {
  route: ConfiguredRoute;
  timetable: StopTimeTable;
}) {
  const uniqueTrips = getUniqueTrips(timetable);

  const stopTimeTable: string[][] = [];
  uniqueTrips.forEach((trip) => stopTimeTable.push(trip));

  const stopBuddies = new Map<string, Set<string>>();

  for (const trip of stopTimeTable) {
    for (let i = 0; i < trip.length; i++) {
      const currentStop = trip[i];
      const stopBuddy = trip[i + 1];

      if (stopBuddies.has(currentStop)) {
        stopBuddy && stopBuddies.get(currentStop)?.add(stopBuddy);
      } else {
        const buddies = new Set<string>();
        stopBuddy && buddies.add(stopBuddy);
        stopBuddies.set(currentStop, buddies);
      }
    }
  }

  const stopBuddiesEntries = [...stopBuddies.entries()];

  return {
    startStopIds: [],
    endStopIds: stopBuddiesEntries
      .filter((e) => e[1].size === 0)
      .map((e) => e[0]),
    path: Object.fromEntries(
      stopBuddiesEntries.map(([key, value]) => [key, [...value]])
    ),
  };
}
