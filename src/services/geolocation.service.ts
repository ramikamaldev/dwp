import fetch from 'node-fetch';
import { getDistance, convertDistance } from "geolib"

export async function apiRequest(url: string) {
    const response = await fetch(url);
    const jsonResponse = response.json();
    return jsonResponse;
}

export function calculateDistance(userLatitude: number, userLongitude: number) {
    const londonLatitiude = 51.5072;
    const londonLongitude = 0.1276;
    return convertDistance(getDistance(
        { latitude: londonLatitiude, longitude: londonLongitude },
        { latitude: userLatitude, longitude: userLongitude }
    ), "mi");
}

export async function buildUrlAndSendRequest(url: string) {
    const builtURL = new URL(url);
    const fetchedResponse = await apiRequest(builtURL.href);
    return fetchedResponse;
}

export function appendDistanceToUser(usersResponse: Array<any>) {
    let distanceArray = [];
    usersResponse.forEach(user => {
        const { latitude, longitude } = user;
        const response = calculateDistance(latitude, longitude);
        user["distanceFromLondonInMiles"] = response;
        distanceArray.push(user);
    });
    return distanceArray;
}

export function amalgamateDistanceAndResidingArrays(usersListedInLondon: Array<any>, filteredByDistanceToLondon: Array<any>) {
    let residingInAndAroundLondon = filteredByDistanceToLondon;
    usersListedInLondon.forEach(user => {
        let matching = false;
        for (let i = 0; i < filteredByDistanceToLondon.length; i++) {
            if (filteredByDistanceToLondon[i].id === user.id) {
                matching = true;
                break;
            }
        }
        if (matching === false) {
            residingInAndAroundLondon.push(user);
        }
    });
    return residingInAndAroundLondon;
}