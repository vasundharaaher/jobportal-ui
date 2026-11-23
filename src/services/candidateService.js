import api from "./api";

const candidateProfilePath = (candidateId) =>
  candidateId
    ? `/candidate/${encodeURIComponent(candidateId)}/profile/`
    : "/candidate/profile/";

const candidateProfileUpdatePath = (candidateId) =>
  candidateId
    ? `/candidate/${encodeURIComponent(candidateId)}/profile/update/`
    : "/candidate/profile/update/";

const appliedJobsPath = (candidateId) =>
  candidateId
    ? `/candidate/${encodeURIComponent(candidateId)}/applied-jobs/`
    : "/candidate/applied-jobs/";

const unwrapResponse = ({ data }) => {
  if (data?.success === false) {
    throw new Error(data.message || "Candidate API request failed.");
  }

  if (data?.success === true && Object.hasOwn(data, "data")) {
    return data.data;
  }

  return data;
};

const unwrapList = (response) => {
  const data = unwrapResponse(response);
  const items = Array.isArray(data)
    ? data
    : data?.results ?? data?.jobs ?? data?.applied_jobs;

  if (!Array.isArray(items)) {
    throw new TypeError("Candidate API response must contain a list.");
  }

  return items;
};

const candidateService = {
  getProfile: async (candidateId) =>
    unwrapResponse(await api.get(candidateProfilePath(candidateId))),
  updateProfile: (data, candidateId) =>
    api.post(candidateProfileUpdatePath(candidateId), data),
  getJobs: async () => unwrapList(await api.get("/candidate/jobs/")),
  getAppliedJobs: async (candidateId) =>
    unwrapList(await api.get(appliedJobsPath(candidateId))),
  applyToJob: async (jobId) =>
    unwrapResponse(await api.post(`/jobs/${encodeURIComponent(jobId)}/apply/`)),
};

export default candidateService;
