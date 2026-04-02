const API_URL = "http://localhost:5000/api";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

async function fetchAPI<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  body?: unknown
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || "API Error");
  }

  return data.data;
}

export const blogsApi = {
  getAll: () => fetchAPI<any[]>("/blogs"),
  getById: (id: string) => fetchAPI<any>(`/blogs/${id}`),
  create: (data: any) => fetchAPI<any>("/blogs", "POST", data),
  update: (id: string, data: any) => fetchAPI<any>(`/blogs/${id}`, "PUT", data),
  delete: (id: string) => fetchAPI<any>(`/blogs/${id}`, "DELETE"),
  togglePublish: (id: string) => fetchAPI<any>(`/blogs/${id}/publish`, "PATCH"),
};

export const aiApi = {
  generate: (data: any) => fetchAPI<any>("/ai/generate", "POST", data),
  getTrending: (niche: string) => fetchAPI<any[]>(`/ai/trending/${niche}`),
  generateHooks: (title: string, niche: string) =>
    fetchAPI<string[]>("/ai/viral-hooks", "POST", { title, niche }),
};

export const dashboardApi = {
  getStats: () => fetchAPI<any>("/dashboard/stats"),
};
