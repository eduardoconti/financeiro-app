import API from "./Api";
const ENDPOINT = "auth/login";

export async function ObtemToken(body) {
  try {
    const res = await API.post(ENDPOINT, body);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

function errorResponse(error) {
  return error.response.data;
}
