import axios from "axios";

export const axiosInstance = async (method, endpoint, payload) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios({
      method,
      url: `https://bloodbank-d7gk.onrender.com/${endpoint}`, // Update the URL here
      data: payload,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    // Handle specific errors if needed
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      return { message: "No response received from server" };
    } else {
      // Something happened in setting up the request that triggered an Error
      return { message: "Error setting up request" };
    }
  }
};
