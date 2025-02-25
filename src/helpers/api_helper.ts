import axios from "axios";
import Cookies from 'universal-cookie';
import { ApiError, ApiResponse, isApiError } from "helpers/api_interfaces";

// default
axios.defaults.baseURL = "";

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
// content type
// let authUser: any = (localStorage.getItem("authUser"));

axios.interceptors.response.use(
  function (response: any) {
    return response.data ? response.data : response;
  },
  /*function (response): ApiResponse {
    // Retornar los datos junto con el estado
    return { data: response.data, status: response.status };
  },*/
  function (error): Promise<ApiError> {
    // Manejar los errores y construir un objeto ApiError
    let message: string;

    switch (error.response?.status) {
      case 500:
        message = "Internal Server Error";
        break;
      //case 401:
       // message = "Invalid credentials";
       // break;
      //case 404:
      //  message = "Sorry! The data you are looking for could not be found";
      //  break;
      default:
        message = error.response?.data?.message || error.message || "Unknown error";
    }

    const apiError: ApiError = {
      message,
      status: error.response?.status || 0,
    };

    return Promise.reject(apiError);
  }
);
/*// intercepting to capture errors
axios.interceptors.response.use(
  function (response: any) {
    //return response.data ? response.data : response;
    return { ...response.data, status: response.status };
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message: any;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.response.data.message || error.message || error;
    }
    return Promise.reject({ message, status: error.response.status });
    //default:
    //  message = error.message || error;
    //}
    //return Promise.reject(message );
  }
);*/

/**
 * Sets the default authorization
 * @param {*} token
 */
/*const setAuthorization = (token: any) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};
*/
const setAuthorization = () => {
  const cookies = new Cookies(null, { path: '/' });
  axios.defaults.headers.common["Authorization"] = "Bearer " + cookies.get("authToken");
};

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url: any, params: any) => {
    let response: any;

    let paramKeys: any = [];

    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = async (url: any, data: any) => {

    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url: any, data: any) => {
    return axios.patch(url, data);
  };

  put = (url: any, data: any) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url: any, config: any) => {
    return axios.delete(url, { ...config });
  };
}

const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };