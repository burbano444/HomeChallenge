import http from "k6/http";
import { check } from "k6";

//Setting the high number of users
export const options = {
    vus: 100, 
    duration: "1m",
};

//Calling URL from cypress.env.json
const config = JSON.parse(open('../cypress.env.json'));
const baseURL = config.baseUrl;

//Requesting the pet by ID
export default function () {
    const res = http.get(`${baseURL}/pet/1`);
    check(res, {
        "status is 200 or 429": (r) => r.status === 200 || r.status === 429, 
    });
}
