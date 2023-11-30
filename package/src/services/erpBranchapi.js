const BASE_URL = 'http://10.1.50.152:8080';
export const ERP_Branch_List = async() => {
    const url = `${BASE_URL}/branch`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };