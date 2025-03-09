import { faker } from '@faker-js/faker';

interface Pet {
    id: number;
    name: string;
    photoUrls: string[];
    tags: string[];
    status: string;
}

export function createRandomPet(): Pet{
    return {
        id: faker.number.int(),
        name: faker.animal.petName(),
        photoUrls: [],
        tags: [],
        status: getRandomStatus(),
    }
}

function getRandomStatus(): string {
    const possibleStatus = ["","available", "pending", "sold"]
    const randomIndex = Math.floor(Math.random() * possibleStatus.length);
    return possibleStatus[randomIndex];
}

