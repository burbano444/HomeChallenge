import http from "k6/http";
import { check } from "k6";

//Load test data from a JSON file pets.json in the data folder
const pets = JSON.parse(open("/k6_scripts/data/pets.json"));

//Setting the 10 Virtual Users and the duration
export const options = {
  vus: 10,
  duration: "1m",
};

//Calling URL from cypress.env.json
const config = JSON.parse(open('../cypress.env.json'));
const baseURL = config.baseUrl;

//Selecting in a random way the pets of JSON file pets.json
export default function () {
  const pet = pets[Math.floor(Math.random() * pets.length)];
  const res = http.post(`${baseURL}/pet`, JSON.stringify(pet), {
    headers: { "Content-Type": "application/json" },
  });
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
