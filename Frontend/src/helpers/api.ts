import { Notification } from "./notification";

export function Api() {
  const _baseUrl = "http://localhost:5114";
  const api = "/api/";
  const { Error} = Notification();
  async function Request<T>(method: string, ep: string, payload: T) {
    const url = new URL(_baseUrl + api + ep);
    try {
      const requestConfig: RequestInit = {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: _baseUrl,
          Authorization: `Bearer ${GetToken()}`,
        },
        cache: "default",
      };

      if (method === "POST" || method === "PUT") {
        requestConfig.body = JSON.stringify(payload);
      }

      return await fetch(url.toString(), requestConfig);
    } catch (ex) {
      Error("Error", ex as string);
      throw ex;
    }
  }

  function SaveToken(token: string) {
    localStorage.setItem("Token", token);
  }

  function GetToken() {
    try {
      localStorage.getItem("Token");
    } catch (error) {
      return "";
    }
  }

  return {
    Request,
    SaveToken,
  };
}
