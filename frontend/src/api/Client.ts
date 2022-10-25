const baseUrl = "http://localhost:8000";

export default class ApiClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  async getData() {
    const response = await fetch(baseUrl + "/users");
    return response;
  }
  async sendData(data: Omit<T, "id">) {
    const response = await fetch(baseUrl + this.endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }
  async removeData(id: number) {
    const response = await fetch(baseUrl + this.endpoint + id, {
      method: "DELETE",
    });
    return response;
  }
}
