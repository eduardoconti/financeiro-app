import API from "./Api";

const ENDPOINT = "wallet/";

export async function retornaCarteiras() {
  try {
    const res = await API.get(ENDPOINT);
    return res.data;
  } catch (error) {
 
    return [{ id: 0, descricao: "" }];
  }
}

export async function insereCarteira(carteira) {
  try {
    const res = await API.post(ENDPOINT, carteira);
    return {
      status: res.status.valueOf(),
      data: res.data,
      message: "Inserido Carteira",
    };
  } catch (error) {
    return error.response.data;
  }
}

export async function deletaCarteira(id) {
  try {
    const res = await API.delete(ENDPOINT + id);
    return {
      status: res.status.valueOf(),
      data: res.data,
      message: "Deletado Categoria",
    };
  } catch (error) {
    return error.response.data;
  }
}

export async function alteraCarteira(carteira) {
  try {
    const res = await API.put(ENDPOINT + carteira.id, carteira);
    return {
      status: res.status.valueOf(),
      data: res.data,
      message: "Alterado Categoria",
    };
  } catch (error) {
    return error.response.data;
  }
}
