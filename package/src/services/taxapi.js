const BASE_URL = 'http://10.1.50.152:8080';
export const branch_employees_tax = async(branch,month,year) => {
    const url = `${BASE_URL}/people/branch/tax?branch=${encodeURIComponent(branch)}&month=${encodeURIComponent(month)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };