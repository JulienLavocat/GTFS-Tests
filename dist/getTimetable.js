"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimetable = void 0;
const axios_1 = __importDefault(require("axios"));
const getTimetable = async () => {
    const res = await axios_1.default.get("http://localhost:4000/v1/gtfs/61e7c73396ba42367e34cd95/timetables?agencyKey=stac&routeId=13-68&directionId=0");
    return res.data.stops;
};
exports.getTimetable = getTimetable;
