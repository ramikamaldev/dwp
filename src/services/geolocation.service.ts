import fetch from "node-fetch";

export async function apiRequest(url: string) {
    const response = await fetch(url);
    const jsonResponse = response.json();
    return jsonResponse;
}