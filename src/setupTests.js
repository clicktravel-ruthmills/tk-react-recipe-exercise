global.mockFetchPromise = (data, options = {}) => {
  const defaultOptions = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  };
  const finalOptions = Object.assign({}, defaultOptions, options);

  const response = {
    status: finalOptions.status,
    headers: {
      get(key) {
        return finalOptions.headers[key];
      },
    },
    json() {
      return Promise.resolve(data);
    },
    text() {
      return Promise.resolve(data);
    },
  };
  response.clone = () => response;
  return Promise.resolve(response);
};

global.mockFailedFetchPromise = (data, options = {}) => {
  const defaultOptions = {
    status: 400,
  };
  const finalOptions = Object.assign({}, defaultOptions, options);

  return Promise.resolve({
    status: finalOptions.status,
    json() {
      return Promise.reject(data);
    },
  });
};
