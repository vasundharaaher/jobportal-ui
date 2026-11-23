export const getStoredUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user && typeof user === "object" ? user : null;
  } catch {
    return null;
  }
};

export const normalizeRole = (role) => String(role || "").trim().toLowerCase();
