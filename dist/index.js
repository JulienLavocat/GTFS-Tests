"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTimetable_1 = require("./getTimetable");
(async () => {
    const stops = Object.values(await (0, getTimetable_1.getTimetable)())
        .sort((a, b) => a.stopSequence - b.stopSequence)
        .map((e) => e.stop);
    console.log(stops);
})();
