import { ConfiguredRoute, StopTimeTable } from "@iteatime/nextop-library";

export function getPaths({
  route,
  timetable,
}: {
  route: ConfiguredRoute;
  timetable: StopTimeTable;
}) {
  return "done";
}
