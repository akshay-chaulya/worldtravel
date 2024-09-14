const structuredError = (error) => {
  const code = error.code;
  const message = error.response?.data?.message || error.message || null;
  return { code, message };
};

export default structuredError;
