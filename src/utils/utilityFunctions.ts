export function capitaliseFirstLetter(stringToCapitalise: string) {
    let splitCapitlisationString = stringToCapitalise.split("");
    splitCapitlisationString[0] = splitCapitlisationString[0].toUpperCase();
    stringToCapitalise = splitCapitlisationString.join("");
    return stringToCapitalise;
}