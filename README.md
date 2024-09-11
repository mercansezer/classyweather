# ClassyWeather

ClassyWeather is a React application that retrieves the weather information for a specified city or location. This project utilizes the `Open Meteo API` to fetch location-based weather data and display it to the user.

## Features

- Fetches location information (latitude, longitude) based on the city name using `geocoding-api.open-meteo.com`.
- Retrieves weather data using `api.open-meteo.com` based on the location information.
- Displays maximum and minimum temperatures.
- Shows an error message if the location is not found.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/classyweather.git
   cd classyweather


   ## Technologies Used

- **React**: For building the user interface.
- **Open Meteo API**: To fetch weather data.
- **Fetch API**: Used to retrieve data from the API.
- **CSS**: Basic styling for the application.

## API Integration

Two different APIs are integrated in the project:

1. **Geocoding API**:
   - `https://geocoding-api.open-meteo.com/v1/search?name={location}`
   - This API fetches the latitude and longitude based on the provided city name.

2. **Forecast API**:
   - `https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&timezone={timezone}&daily=temperature_2m_max,temperature_2m_min`
   - This API fetches weather data (maximum and minimum temperatures) based on the latitude, longitude, and timezone.

## Usage

- The user enters a city name.
- The system retrieves the location data based on the input city name.
- Weather data (max and min temperatures) is then displayed for that location.

## Error Handling

- If an invalid city name is entered or if the API fails to retrieve data, the app will display a "Location not found" error message.
