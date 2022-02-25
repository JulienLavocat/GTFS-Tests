import { Graph } from "graphlib";
import { RoutePath } from ".";

export class GraphGenerator {
  g: Graph;
  departureStops: string[];
  arrivalStops: string[];
  path: Record<string, string[]>;

  /**
   * Initialize a graph generator instance that will transform the path into a graph
   * @param path RoutePath to transform
   */
  constructor(path: RoutePath) {
    this.g = new Graph();
    this.departureStops = path.arrivalStopIds;
    this.arrivalStops = path.departureStopIds;
    this.path = path.path;
  }

  /**
   * Traverse a stop and add it's edge to it's next buddy
   * If stop has more than one buddy, then it recursively traverse them until the end of the line
   * @param currentStop Current stop to traverse
   * @param previousStop Previously traversed stop (allows to check for lassos)
   */
  private traverseStop(currentStop: string, previousStop?: string) {
    do {
      const stopBuddies = this.path[currentStop];
      if (stopBuddies.length > 1) {
        for (let i = 0; i < stopBuddies.length; i++) {
          const stopBuddy = stopBuddies[i];
          if (stopBuddy === previousStop) {
            // Loop to previous stop
            this.g.setEdge(stopBuddy, currentStop);
            continue;
          }
          this.g.setEdge(currentStop, stopBuddy);
          this.traverseStop(stopBuddy, currentStop);
        }
      }
      this.g.setEdge(currentStop, stopBuddies[0]);
      currentStop = stopBuddies[0];
    } while (!this.departureStops.includes(currentStop));
  }

  /**
   * Compute the graph representation of the route
   * @returns Graph representing the route
   */
  getGraph(): Graph {
    this.g.setNode(this.arrivalStops[0]);
    this.g.setNode(this.departureStops[0]);

    for (const startStop of this.arrivalStops) {
      this.traverseStop(startStop);
    }

    return this.g;
  }
}
