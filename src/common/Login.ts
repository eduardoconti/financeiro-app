import API from "./Api";
const ENDPOINT = "auth/login";

export async function ObtemToken(body: any) {
  try {
    const { data } = await API.post(ENDPOINT, body);
    return data;
  } catch (error) {
    return errorResponse(error);
  }
}

function errorResponse(error: any) {
  return error.response.data;
}
