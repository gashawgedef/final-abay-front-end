const BASE_URL = 'http://10.1.50.152:8080';
export const getPrice = async () => {
  const url = `${BASE_URL}/price`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};