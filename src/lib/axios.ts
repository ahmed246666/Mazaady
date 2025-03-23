import axios, { AxiosError } from "axios";

const API_BASE_URL = "https://stagingapi.mazaady.com/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "private-key": "Tg$LXgp7uK!D@aAj^aT3TmWY9a9u#qh5g&xgEETJ",
    platform: "Postman",
    "content-language": "en",
    Accept: "application/json",
    currency: "AED",
  },
});

// Generic error handler
export const handleError = (error: AxiosError) => {
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 400:
        console.error("Bad Request:", data);
        break;
      case 422:
        console.error("Unprocessable Entity:", data);
        break;
      case 404:
        console.error("Not Found:", data);
      default:
        console.error(`HTTP Error ${status}:`, data);
    }
  } else if (error.request) {
    console.error("Network Error:", error.request);
  } else {
    console.error("Error:", error.message);
  }
  return null;
};
