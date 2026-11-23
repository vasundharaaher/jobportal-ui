import api from "./api";

const companyProfilePath = (companyId) =>
  companyId
    ? `/company/${encodeURIComponent(companyId)}/profile/`
    : "/company/profile/";

const companyProfileUpdatePath = (companyId) =>
  companyId
    ? `/company/${encodeURIComponent(companyId)}/profile/update/`
    : "/company/profile/update/";

const companyJobsPath = (companyId) =>
  companyId
    ? `/company/${encodeURIComponent(companyId)}/jobs/`
    : "/company/jobs/";

const companyApplicantsPath = (companyId) =>
  companyId
    ? `/company/${encodeURIComponent(companyId)}/applicants/`
    : "/company/applicants/";

const unwrapResponse = ({ data }) => {
  if (data?.success === false) {
    throw new Error(data.message || "Company API request failed.");
  }

  if (data?.success === true) {
    if (Object.hasOwn(data, "data")) {
      return data.data;
    }

    if (Object.hasOwn(data, "profile")) {
      return data.profile;
    }
  }

  return data;
};

const unwrapList = (response) => {
  const data = unwrapResponse(response);
  const items = Array.isArray(data)
    ? data
    : data?.results ?? data?.jobs ?? data?.applicants;

  if (!Array.isArray(items)) {
    throw new TypeError("Company API response must contain a list.");
  }

  return items;
};

const companyService = {
  getProfile: async (companyId) =>
    unwrapResponse(await api.get(companyProfilePath(companyId))),
  updateProfile: (data, companyId) =>
    api.patch(companyProfileUpdatePath(companyId), data),
  postJob: (data) => api.post("/company/jobs/post/", data),
  getJobs: async (companyId) =>
    unwrapList(await api.get(companyJobsPath(companyId))),
  getApplicants: async (companyId) =>
    unwrapList(await api.get(companyApplicantsPath(companyId))),
};

export default companyService;
