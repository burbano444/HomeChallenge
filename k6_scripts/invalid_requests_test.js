import http from "k6/http";
import { check } from "k6";

export const options = {
    vus: 10,
    duration: "1m",
};

//Calling URL from cypress.env.json
const config = JSON.parse(open('../cypress.env.json'));
const baseURL = config.baseUrl;

export default function () {
    //Create a invalid pet
    const invalidPayload = JSON.stringify({
        id: "invalid-id", //Invalid ID format
        name: "",         //Invalid name
        status: 12345,    //Invalid status value
    });

    //Post an invalid pet
    const res = http.post(`${baseURL}/pet`, invalidPayload, {
        headers: { "Content-Type": "application/json" },
    });
    check(res, {
        "status is 400 or 422": (r) => r.status === 400 || r.status === 422,
    });
}
