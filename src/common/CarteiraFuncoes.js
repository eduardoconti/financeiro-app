import API from "./Api";

const ENDPOINT = "wallet/";

export async function retornaCarteiras() {
  try {
    const { data } = await API.get(ENDPOINT);
    return data;
  } catch (error) {
    return [{ id: 0, descricao: "" }];
  }
}

export async function insereCarteira(carteira) {
  try {
    const { data } = await API.post(ENDPOINT, carteira);
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deletaCarteira(id) {
  try {
    const { data } = await API.delete(ENDPOINT + id);
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function alteraCarteira(carteira) {
  try {
    const { data } = await API.put(ENDPOINT + carteira.id, carteira);
    return data;
  } catch (error) {
    return error.response.data;
  }
}
