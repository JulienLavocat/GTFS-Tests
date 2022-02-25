import { ConfiguredRoute, StopTimeTable } from "@iteatime/nextop-library";
import { getArrivalDeparturesStopIds } from "./getStartEndStopsIds";
import { generateStopBuddiesList } from "./getStopBuddiesList";
import { getUniqueTrips } from "./getUniqueTrips";

export interface RoutePath {
  departureStopIds: string[];
  arrivalStopIds: string[];
  path: Record<string, string[]>;
}

export function getPaths({
  timetable,
}: {
  route: ConfiguredRoute;
  timetable: StopTimeTable;
}): RoutePath {
  const uniqueTrips = getUniqueTrips(timetable);
  const stopBuddies = generateStopBuddiesList(uniqueTrips);

  // Transform stopBuddies to a map of string and array to have a cleaner code later
  // (maps and sets can be quite messy to deal with sometimes...)
  const stopBuddiesEntries = [...stopBuddies.entries()].map(([key, value]) => [
    key,
    [...value],
  ]) as [string, string[]];

  const [departureStopIds, arrivalStopIds] =
    getArrivalDeparturesStopIds(stopBuddiesEntries);

  return {
    departureStopIds,
    arrivalStopIds,
    path: Object.fromEntries(stopBuddiesEntries as any),
  };
}
