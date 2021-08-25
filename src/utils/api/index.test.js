import {
    request,
} from 'index';

const getMockFetch = (responseData, options = {}) => {
    if (options.status && options.status >= 400) {
        global.fetch = jest.fn(() => mockFailedFetchPromise(responseData, options));
    } else {
        global.fetch = jest.fn(() => mockFetchPromise(responseData, options));
    }
    return fetch;
};

test('request with no name search', async () => {
  const mockFetch = getMockFetch();
  const method = 'GET';

  await request(url, options);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    'http://localhost:8080/recipes/',
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  );
});
