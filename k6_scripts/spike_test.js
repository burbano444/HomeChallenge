import http from "k6/http";
import { check } from "k6";

//Stages of spike
export const options = {
    stages: [
        { duration: "10s", target: 0 },   // Start with 0 users
        { duration: "10s", target: 300 }, // Spike to 300 users
        { duration: "30s", target: 300 }, // Maintain spike
        { duration: "10s", target: 0 },   // Ramp-down to 0 users
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
