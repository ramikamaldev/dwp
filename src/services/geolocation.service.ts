import fetch from 'node-fetch';
import { getDistance, convertDistance } from "geolib"

export async function apiRequest(url: string) {
    try {
        const response = await fetch(url);
        const jsonResponse = response.json();
        return jsonResponse;
    }
    catch (e: any) {
        throw e;
    }
}

export async function buildUrlAndSendRequest(url: string) {
    try {
        const builtURL = new URL(url);
        const fetchedResponse = await apiRequest(builtURL.href);
        return fetchedResponse;
    }
    catch (e: any) {
        throw e
    }

}

export function appendDistanceToUsersGeneric(locLat: number, locLong: number, usersResponse: Array<any>) {
    let distanceArray = [];
    usersResponse.forEach(user => {
        const { latitude, longitude } = user;
        const response = calculateDistanceGeneric(locLat, locLong, latitude, longitude);
        user["distanceFromLocationInMiles"] = response;
        distanceArray.push(user);
    });
    return distanceArray;
}

export function calculateDistanceGeneric(locationLat: number, locationLongitude: number, userLatitude: number, userLongitude: number) {
    return convertDistance(getDistance(
        { latitude: locationLat, longitude: locationLongitude },
        { latitude: userLatitude, longitude: userLongitude }
    ), "mi");
}


export async function getLocationLatLong(city: string) {
    try {
        const search = `?address=${city}&key=${process.env.GOOG_APIKEY}`
        const url = `${process.env.GOOG_GEOLOC_URL}${search}`
        const response = await buildUrlAndSendRequest(url);
        const latLong = response.results[0].geometry.location;
        return latLong;
    }
    catch (e: any) {
        throw e;
    }

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