# Flight Booking System

This is a backend implementation of a Flight Booking System, allowing users to register, login, view available flights, book flights, and manage bookings. The system is built using Node.js, Express.js, and MongoDB (NEM stack).

## Features:

- **User Registration:**
  - Allow users to register with hashed password storage.

- **User Login:**
  - Allow users to log in with JWT token generation on successful login.

- **Get All Flights:**
  - Retrieve a list of all available flights.

- **Get Specific Flight Details:**
  - Retrieve detailed information about a specific flight using its ID.

- **Add New Flight:**
  - Allow authorized users to add new flights to the system.

- **Update Specific Flight Details:**
  - Allow authorized users to update the details of a specific flight.

- **Delete Specific Flight:**
  - Allow authorized users to delete a specific flight.

- **Book a Flight:**
  - Allow authorized users to book flights.
    

- **Get Booking Dashboard:**
  - Retrieve a dashboard listing all bookings with user and flight details.

- **Update Booking Details:**
  - Allow authorized users to edit/update booking details.

- **Delete Booking:**
  - Allow authorized users to delete a booking.

## Tech Stack:

- **Node.js:** JavaScript runtime for server-side development.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing user and flight data.
- **JWT (JSON Web Token):** Token-based authentication for secure user sessions.

## Getting Started:

POST
User Registeration
https://adobemockairticketing.onrender.com/api/register
This API endpoint allows users to register with the application. Upon making an HTTP POST request to the specified URL, users can provide their name, email, and password in the request body to register. The request body should be in raw format with the keys "name", "email", and "password".

Request Body
name (text, required): The name of the user.

email (text, required): The email address of the user.

password (text, required): The password chosen by the user.

Response
Upon successful registration, the API returns a status code of 201 and a JSON response with a message confirming the registration. The response body contains the key "mesg" with a corresponding message.

Example:

JSON
{
    "mesg": "Registration successful"
}
﻿

Body
raw (json)
json
{
    "name":"shraddha",
    "email":"shraddha@gmail.com",
    "password":"shraddha"
}
POST
User Login
https://adobemockairticketing.onrender.com/api/login
This endpoint is used to log in to the Adobe Mock Air Ticketing system. The HTTP POST request requires the user's email and password in the request body to authenticate the user.

Request Body
email (text, required): The email of the user.

password (text, required): The password of the user.

Example
JSON
{
    "email": "user@example.com",
    "password": "userpassword"
}
Response
Upon successful authentication, the server returns a JSON object with the following properties:

mesg: A message from the server.

loginUser: Details of the logged-in user.

token: Authentication token for the logged-in user.

In case of a successful login, the status code is 200 and the content type is "application/json".

Example
JSON
{
    "mesg": "",
    "loginUser": "",
    "token": ""
}
﻿

Body
raw (json)
json
{
    
    // "name":"shraddha",
    "email":"shraddha@gmail.com",
    "password":"shraddha"

}
POST
Adding Flights
https://adobemockairticketing.onrender.com/api/flights
Add Flights
This endpoint allows you to add a new flight to the system.

Request Body
airline (string): The name of the airline.

flightNo (string): The flight number.

departure (string): The departure city.

arrival (string): The arrival city.

seats (number): The total number of seats available on the flight.

price (number): The price of the flight.

Response
Status: 200

Content-Type: application/json

mesg (string, optional): A message indicating the success of the operation.

﻿

Request Headers
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVlZmFmMjZiYjQ5NjQ3OTg0ZDQ4NTMiLCJpYXQiOjE3MTAxNjE0NjR9.K1kppmwL7yA-l4nBU7jMJ1qwAuxuUhY5ApVmhLmQG4Y
Body
raw (json)
json
 {
    "airline": "Example Airlines",
    "flightNo": "E123",
    "departure": "City A",
    "arrival": "City B",
    // "departureTime": Date ("2024-03-11T08:00:00"),
    // "arrivalTime": Date ("2024-03-11T10:00:00"),
    "seats": 150,
    "price": 250.00
  }
