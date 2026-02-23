// In production (e.g. Vercel), same-origin /api when VITE_API_URL is not set
const API_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.PROD ? '' : 'http://localhost:5001') + '/api';

// Parse JSON or throw a clear error when server returns HTML (e.g. 404 page)
async function parseJsonResponse(response) {
  const text = await response.text();
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(
      response.status === 404
        ? 'API not found. If deployed, ensure the API route and env vars are set.'
        : `Server returned ${response.status} (expected JSON). Check network tab.`
    );
  }
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error('Invalid JSON from server');
  }
}

// Helper function to get auth token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// API functions
export const api = {
  // Auth endpoints
  async register(userData) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await parseJsonResponse(response);
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return data;
  },

  async login(credentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await parseJsonResponse(response);
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  },

  // Notes endpoints
  async getNotes() {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await parseJsonResponse(response);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login again');
      }
      throw new Error(data.message || 'Failed to fetch notes');
    }
    return data;
  },

  async createNote(noteData) {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });

    const data = await parseJsonResponse(response);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login again');
      }
      throw new Error(data.message || 'Failed to create note');
    }
    return data;
  },

  async deleteNote(noteId) {
    const response = await fetch(`${API_URL}/notes/${noteId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login again');
      }
      const data = await parseJsonResponse(response);
      throw new Error(data.message || 'Failed to delete note');
    }
    return { success: true };
  },

  async updateNote(noteId, noteData) {
    const response = await fetch(`${API_URL}/notes/${noteId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });

    const data = await parseJsonResponse(response);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login again');
      }
      throw new Error(data.message || 'Failed to update note');
    }
    return data;
  },
};
