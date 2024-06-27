import{BASE_URL} from "../utils/constants"
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
  
export const Addis_Branch_List = async() => {
    const url = `${BASE_URL}/branch/addis/region`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const Branch_fc_code = async(branch) => {
    const url = `${BASE_URL}/branch/fc-code?branch_id=${branch}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };