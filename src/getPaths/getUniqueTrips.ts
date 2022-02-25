import { StopTime, StopTimeTable } from "@iteatime/nextop-library";

/**
 * Transform a stop ID in order to link 2 stops in the same geographical area (!= geographical position) such as PRTRO1 and PRTO12 -> PRTRO1
 * @param stop StopTime to transform
 * @returns transformed stopId
 */
function transformStopId({ stopId }: StopTime) {
  return isNaN(+stopId.slice(-2)) ? stopId : stopId.slice(0, stopId.length - 1);
}

/**
 *
 * @param services StopTimeTable of the route
 * @returns an array of unique trips
 */
export function getUniqueTrips({ services }: StopTimeTable) {
  const tripsHashes = new Set<string>();
  const trips: string[][] = [];

  // Get all trips, sort (by stop sequence) and hash them (join their IDS) to remove duplicates
  Object.values(services)
    .map(({ trips }) => Object.values(trips))
    .flat() // Retrieve all trips accross every services in a flattened array
    .forEach(({ stopTimes }) => {
      if (!stopTimes) return;

      // Order all stop times and join them to create a hash
      const sortedStopTimes = stopTimes
        .sort((a, b) => a.stopSequence - b.stopSequence)
        .map(transformStopId);

      const hash = sortedStopTimes.join(";");

      // Add trip only if it hasn't already been added
      if (tripsHashes.has(hash)) return;

      tripsHashes.add(hash);
      trips.push(sortedStopTimes);
    });

  return trips;
}
