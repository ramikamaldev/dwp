# Dwp technical interview

Dwp GeoLocation query API.

## In order to run:

1. Clone the project to your local file system using the command:
   ```bash
   git clone https://github.com/ramikamaldev/dwp.git
   ```
2. Install the required node packages using the command:
   ```bash
   npm install
   ```
3. In a terminal transpile by running the Grun Task Runner using the command:
   ```bash
   grunt --env=dev
   ```
4. Run the program using the command:
   ```bash
   npm start
   ```
5. In order to query the API make a GET request to http://localhost:5000/api/users/<london> - where what is in the angle brackets can be any city. For example http://localhost:5000/api/users/london or http://localhost:5000/api/users/standerton .
