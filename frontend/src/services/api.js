const BASE_URL = import.meta.env.VITE_SERVER_URL;

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  register: async (userData) => {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    return response;
  },
};

// Questionnaire API calls
export const questionnaireAPI = {
  getList: async () => {
    const response = await fetch(`${BASE_URL}/api/questionnaire/list`, {
      credentials: "include",
    });
    return response;
  },

  getById: async (id) => {
    const response = await fetch(`${BASE_URL}/api/questionnaire/${id}`, {
      credentials: "include",
    });
    return response;
  },

  submitAnswers: async (id, answers) => {
    const response = await fetch(`${BASE_URL}/api/questionnaire/${id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ answers }),
    });
    return response;
  },

  getPublic: async (link) => {
    const response = await fetch(`${BASE_URL}/api/q/public/${link}`, {
      credentials: "include",
    });
    return response;
  },

  submitPublic: async (link, answers) => {
    const response = await fetch(`${BASE_URL}/api/q/public/${link}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ answers }),
    });
    return response;
  },

  create: async (questionnaireData) => {
    const response = await fetch(`${BASE_URL}/api/questionnaire/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(questionnaireData),
    });
    return response;
  },

  getAttempt: async (id) => {
    const response = await fetch(`${BASE_URL}/api/questionnaire/attempt/${id}`)
  }
};
