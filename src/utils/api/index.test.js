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
  const id = undefined;
  const name = undefined;

  await request(method, id, name);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    '/recipes/',
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    },
  );
});

test('request with ID', async () => {
  const mockFetch = getMockFetch();
  const method = 'GET';
  const id = 123;
  const name = undefined;

  await request(method, id, name);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    '/recipes/123',
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  );
});

test('request with name search', async () => {
  const mockFetch = getMockFetch();
  const method = 'GET';
  const id = undefined;
  const name = 'Pi';

  await request(method, id, name);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    '/recipes/?name=Pi',
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  );
});
