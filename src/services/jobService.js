import api from "./api";

const JOB_ENDPOINTS = Object.freeze({
  list: "/jobs/",
  categories: "/jobs/categories/",
});

const getJobResults = (data) => {
  const jobs = Array.isArray(data) ? data : data?.results;

  if (!Array.isArray(jobs)) {
    throw new TypeError("Jobs API response must contain a results array.");
  }

  return jobs;
};

const jobService = {
  getJobs: async () => {
    const response = await api.get(JOB_ENDPOINTS.list);
    return getJobResults(response.data);
  },
  getCategories: () => api.get(JOB_ENDPOINTS.categories),
  getJobDetail: (id) =>
    api.get(`${JOB_ENDPOINTS.list}${encodeURIComponent(id)}/`),
};

export default jobService;
