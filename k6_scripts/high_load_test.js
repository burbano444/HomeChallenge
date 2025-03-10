import http from "k6/http";
import { check, sleep } from "k6";

//Setting stages
export const options = {
  stages: [
    { duration: "30s", target: 50 }, //Ramp-up to 50 users
    { duration: "30s", target: 100 }, //Maintain 50 users
    { duration: "30s", target: 0 },  //Ramp-down to 0
  ],
};

//Calling URL from cypress.env.json
const config = JSON.parse(open('../cypress.env.json'));
const baseURL = config.baseUrl;

//Simulating high load on key endpoints
export default function () {
  //Creating a new pet
  const createPetPayload = JSON.stringify({
    id: Math.floor(Math.random() * 100000),
    name: `TestPet-${__VU}-${__ITER}`,
    photoUrls: ["https://example.com/photo.jpg"],
    tags: [],
    status: "available",
  });

  //Adding the new pet
  let res = http.post(`${baseURL}/pet`, createPetPayload, {
    headers: { "Content-Type": "application/json" },
  });
  check(res, {
    "POST /pet status is 200": (r) => r.status === 200,
  });

  const petId = res.json("id");

  //Searching the pet by ID
  res = http.get(`${baseURL}/pet/${petId}`);
  check(res, {
    "GET /pet/{petId} status is 200": (r) => r.status === 200,
  });

  //Erasing the pet
  res = http.del(`${baseURL}/pet/${petId}`);
  check(res, {
    "DELETE /pet/{petId} status is 200": (r) => r.status === 200,
  });

  //Pause to simulate user think time
  sleep(1);
}
