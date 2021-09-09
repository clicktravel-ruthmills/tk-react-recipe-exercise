import {
    request,
} from './index.tsx';

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
  const method = 'POST';
  const name = '';

  await request(method, name);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    '/recipes/',
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    },
  );
});

test('request with name search', async () => {
  const mockFetch = getMockFetch();
  const method = 'GET';
  const name = 'Pi';

  await request(method, name);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    '/recipes/?name=Pi',
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  );
});
