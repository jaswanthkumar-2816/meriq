import { apiRequest } from './client';

export async function getResumes(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.category && params.category !== 'All') query.append('category', params.category);
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);
  if (params.min_score) query.append('min_score', params.min_score);

  const qs = query.toString() ? `?${query.toString()}` : '';
  return await apiRequest(`/resumes${qs}`);
}

export async function getCandidate(candidateId) {
  return await apiRequest(`/resumes/${candidateId}`);
}

export function getCandidatePdfUrl(candidateId) {
  return `http://127.0.0.1:8001/api/resumes/${candidateId}/pdf`;
}

export function getDownloadAllZipUrl() {
  return `http://127.0.0.1:8001/api/resumes/download/all-zip`;
}

/**
 * Upload multiple resumes and a Job Description for AI screening & shortlisting.
 * Uses multipart/form-data.
 */
export async function screenResumes({ resumeFiles = [], jdText = '', jdFile = null, threshold = 70 }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
  const formData = new FormData();

  // Append all resume files
  resumeFiles.forEach((file) => {
    formData.append('resumes', file);
  });

  if (jdText && jdText.trim()) {
    formData.append('jd_text', jdText.trim());
  }

  if (jdFile) {
    formData.append('jd_file', jdFile);
  }

  formData.append('threshold', threshold);

  const response = await fetch(`${API_BASE_URL}/api/resume/screen`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || `Screening API Error (${response.status})`);
  }

  return await response.json();
}

