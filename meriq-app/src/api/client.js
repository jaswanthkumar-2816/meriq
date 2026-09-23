// Centralized API Client with Live FastAPI & Intelligent Mock Fallback Engine for MERIQ

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001';

/**
 * Generic API request wrapper that attempts the live FastAPI backend first,
 * and seamlessly falls back to client-side logic if the backend is unreachable.
 */
export async function apiRequest(endpoint, options = {}, mockFallbackFn = null) {
  // Ensure single /api prefix
  const formattedEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
  const url = `${API_BASE_URL}${formattedEndpoint}`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.info(`[MERIQ API Client] Using fallback engine for ${endpoint}:`, err.message);
    if (mockFallbackFn) {
      await new Promise((res) => setTimeout(res, 200));
      return await mockFallbackFn();
    }
    throw err;
  }
}

// Local Storage Helper for persisting user assessments, knowledge states, and retests
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(`meriq_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Storage read error', e);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(`meriq_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write error', e);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(`meriq_${key}`);
    } catch (e) {
      console.error('Storage remove error', e);
    }
  }
};
