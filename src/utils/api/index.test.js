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

test('GET request with no ID or name search', async () => {
  const mockFetch = getMockFetch();
  const method = 'GET';
  const id = undefined;
  const name = undefined;
  const payload = undefined;

  await request(method, id, name, payload);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    '/recipes/',
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  );
});

test('POST request with payload but no ID', async () => {
  const mockFetch = getMockFetch();
  const method = 'POST';
  const id = undefined;
  const name = undefined;
  const payload = { name: 'test name', description: 'test description'};

  await request(method, id, name, payload);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    '/recipes/',
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: '{"name":"test name","description":"test description"}',
    },
  );
});

test('POST request with payload and ID', async () => {
  const mockFetch = getMockFetch();
  const method = 'POST';
  const id = 123;
  const name = undefined;
  const payload = { name: 'test name', description: 'test description'};

  await request(method, id, name, payload);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    '/recipes/123/',
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: '{"name":"test name","description":"test description"}',
    },
  );
});

test('GET request with ID', async () => {
  const mockFetch = getMockFetch();
  const method = 'GET';
  const id = 123;
  const name = undefined;
  const payload = undefined;

  await request(method, id, name, payload);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    '/recipes/123/',
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  );
});

test('GET request with name search', async () => {
  const mockFetch = getMockFetch();
  const method = 'GET';
  const id = undefined;
  const name = 'Pi';
  const payload = undefined;

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
