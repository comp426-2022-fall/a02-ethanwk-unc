#!/usr/bin/env node

import minimist from "minimist";
import moment from 'moment-timezone';
import fetch from 'node-fetch';

//user input
const args = minimist(process.argv.slice(2));

//set defaults
let timezone = moment.tz.guess();
var lat = 0;
var lon = 0;
let days = 1; //"next" day

//console.log(timezone);

//help screen
if (args.h) {
	console.log(`
	Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
	`);
    process.exit(0);
}

if (args.n) {//latitude is positive
    lat = args.n;
}
if (args.s) {//latitude is negative
    lat = args.s * -1;
}
if (args.e) {//longitude is positive
    lon = args.e * -1;
}
if (args.w) {//longitutde is negatve
    lon = args.w * -1;
}
if (args.t) {//sets timezone
    timezone = args.t;
}
//fetch data
const response = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=' + lat +
    '&longitude=' + lon +
    '&daily=precipitation_sum&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=' + timezone
);
const data = await response.json();

if(args.j){
    console.log(data);
    process.exit(0)
}


