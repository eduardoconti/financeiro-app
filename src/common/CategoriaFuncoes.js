import API from "./Api";

const ENDPOINT = "category/";
const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};
export async function retornaCategorias() {
  try {
    const res = await API.get(ENDPOINT, headers);
    return res.data;
  } catch (error) {
    return [{ id: 0, descricao: "" }];
  }
}

export async function insereCategoria(categoria) {
  try {
    const res = await API.post(ENDPOINT, categoria, headers);
    return {
      status: res.status.valueOf(),
      data: res.data,
      message: "Inserido Categoria",
    };
  } catch (error) {
    return error.response.data;
  }
}

export async function deletaCategoria(id) {
  try {
    const res = await API.delete(ENDPOINT + id, headers);
    return {
      status: res.status.valueOf(),
      data: res.data,
      message: "Excluido Categoria",
    };
  } catch (error) {
    return error.response.data;
  }
}

export async function alteraCategoria(carteira) {
  try {
    const res = await API.put(ENDPOINT + carteira.id, carteira, headers);
    return {
      status: res.status.valueOf(),
      data: res.data,
      message: "Alterado Categoria",
    };
  } catch (error) {
    return error.response.data;
  }
}
