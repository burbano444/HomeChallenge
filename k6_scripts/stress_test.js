import http from "k6/http";
import { check } from "k6";

//Stages of stress
export const options = {
    stages: [
        { duration: "1m", target: 10 },  // Start with 10 users
        { duration: "2m", target: 50 },  // Increase to 50 users
        { duration: "3m", target: 100 }, // Stress at 100 users
        { duration: "2m", target: 200 }, // Push up to 200 users
        { duration: "1m", target: 0 },   // Ramp-down to 0 users
    ],
};

//Calling URL from cypress.env.json
const config = JSON.parse(open('../cypress.env.json'));
const baseURL = config.baseUrl;

//Getting the pet by id
export default function () {
    const res = http.get(`${baseURL}/pet/1`);
    check(res, {
        "status is 200": (r) => r.status === 200,
    });
}
