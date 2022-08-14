import API from "./Api";

const ENDPOINT = "category/";
const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};
export async function retornaCategorias() {
  try {
    const { data } = await API.get(ENDPOINT, headers);
    return data;
  } catch (error) {
    return [{ id: 0, descricao: "" }];
  }
}

export async function insereCategoria(categoria) {
  const { data } = await API.post(ENDPOINT, categoria, headers);
  return data;
}

export async function deletaCategoria(id) {
  try {
    const { data } = await API.delete(ENDPOINT + id, headers);
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function alteraCategoria(carteira) {
  const { data } = await API.put(ENDPOINT + carteira.id, carteira, headers);
  return data;
}
