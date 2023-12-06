const BASE_URL = 'http://10.1.50.152:8080';
export const one_employees = async (id) => {
  const url = `${BASE_URL}/people/one/?id=${encodeURIComponent(id)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.Employee;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const branch_employees = async (branch) => {
  const url = `${BASE_URL}/people/employee?branch=${encodeURIComponent(branch)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const branch_employees_salary = async(branch,month,year) => {
  const url = `${BASE_URL}/people/employeedetails?branch=${encodeURIComponent(branch)}&month=${encodeURIComponent(month)}&year=${encodeURIComponent(year)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createEmployee = async (employeeData) => {
  const url = `${BASE_URL}/people/employee`;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData)
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTin = async (data) => {
  const url = `${BASE_URL}/people/tin`;
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
