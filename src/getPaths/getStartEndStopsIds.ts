/**
 * Return an array for departure and arrivals stops
 * @param stopBuddiesEntries
 * @returns [departureStops[], arrivalStops[]]
 */
export function getArrivalDeparturesStopIds(
  stopBuddiesEntries: [string, string[]]
) {
  // Count all occurences of the same stops in an array of buddies + stop
  const stopOccurences = stopBuddiesEntries
    .map(([stop, buddies]) => [stop, ...buddies])
    .flat(1)
    .reduce<Record<string, number>>((acc, stopId) => {
      return acc[stopId] ? ++acc[stopId] : (acc[stopId] = 1), acc;
    }, {});

  // A stop is a starting stop if it's referenced only once
  // A stop is an ending stop if it has no stop buddies
  const [startStops, endStops] = [
    Object.entries(stopOccurences)
      .filter((entry) => entry[1] === 1)
      .map((e) => e[0]),
    stopBuddiesEntries.filter((e) => e[1].length === 0).map((e) => e[0]),
  ];

  // If route is a loop (A -> B -> C -> A) then above code returns empty start and end arrays, this condition handles such situation
  return startStops.length === 0 && endStops.length === 0
    ? [[stopBuddiesEntries[0][0]], [stopBuddiesEntries[0][0]]]
    : [startStops, endStops];
}
