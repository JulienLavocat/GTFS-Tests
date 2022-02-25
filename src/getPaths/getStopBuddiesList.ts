/**
 *
 * Generate the list of every stops inside a route and their "buddies".
 * A buddy stop is defined as every stops which directly follows another.
 * By example :
 * A -> B -> C -> D -> E
 *           F -> G
 *
 * A has B as buddy
 * B has C and F as buddies
 * C has D has buddy
 *
 * @param stopTimeTable Array of ordered stops ids by their sequence representing each unique stops in a route
 * @returns List of all stops and their stop buddies
 */
export function generateStopBuddiesList(stopTimeTable: string[][]) {
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

  return stopBuddies;
}
