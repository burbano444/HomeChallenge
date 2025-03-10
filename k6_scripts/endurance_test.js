import http from "k6/http";
import { check, sleep } from "k6";

//Setting 50 users for 30 minutes
export const options = {
    stages: [
        { duration: "30m", target: 50 },
    ],
};

//Calling URL from cypress.env.json
const config = JSON.parse(open('../cypress.env.json'));
const baseURL = config.baseUrl;

//Endurance tests
export default function () {
    const res = http.get(`${baseURL}/pet/1`);
    check(res, {
        "status is 200": (r) => r.status === 200,
    });
    //Pausing to simulate realistic user behavior
    sleep(1);
}
