import{BASE_URL} from "../utils/constants"
export const getPrice = async () => {
  const url = `${BASE_URL}/price`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const RecordNewPrice = async (data) => {
  const url = `${BASE_URL}/price`;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const updatePrice = async (data) => {
  const url = `${BASE_URL}/price`;
  const requestOptions = {
    method: 'Put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }

}
