const BASE_URL = 'http://10.1.50.152:8080';
export const branch_employees_tax = async(branch,month) => {
    const url = `${BASE_URL}/people/branch/tax?branch=${encodeURIComponent(branch)}&month=${encodeURIComponent(month)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

export const get_branch_tax_report = async(branch,month) => {
    const url = `${BASE_URL}/people/taxreport/branch?branch=${encodeURIComponent(branch)}&month=${encodeURIComponent(month)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const get_Submit_branches = async(month) => {
    const url = `${BASE_URL}/people/gettax/branch/submited?month=${encodeURIComponent(month)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };


  export const branch_employee_tax_by_status = async(branch,month,status) => {
    const url = `${BASE_URL}/people/taxrecord/branch/status?branch=${encodeURIComponent(branch)}&month=${encodeURIComponent(month)}&status=${encodeURIComponent(status)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const employee_tax_by_status = async(month,status) => {
    const url = `${BASE_URL}/people/taxrecord/status?month=${encodeURIComponent(month)}&status=${encodeURIComponent(status)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };


  export const is_branch_employees_tax_exist = async(branch,month) => {
    const url = `${BASE_URL}/people/check/record?branch=${encodeURIComponent(branch)}&month=${encodeURIComponent(month)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const month_list = async() => {
    const url = `${BASE_URL}/people/month`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const bulkTaxRecord = async (data) => {
    const url = `${BASE_URL}/people/bulktax`;
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

  export const updateTaxinfo = async (data) => {
    const url = `${BASE_URL}/people/updatetax`;
    const requestOptions = {
      method: 'Put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch(url,requestOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  export const bulkTaxUpdateInfo = async (data) => {
    const url =`${BASE_URL}/people/bulktaxupdate`;
    const requestOptions = {
      method: 'Put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    try {
      const response = await fetch(url,requestOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }