const SUCCESS_RESPONSE_CODES_NO_DATA = new Set([101, 204, 205, 303]);

const parseResponse = (response: Response): Promise<any> | Response => {
    const contentType = response.headers?.get('Content-Type')
    switch (contentType ? contentType.split(';')[0] : contentType) {
        case 'application/json':
            return response.json();
        default:
            return response.text ? response.text() : response;
    }
};

export const request = (
    method: string,
    id?: number | '',
    name?: string | '',
    payload?: any | undefined,
) => {
    const url = '/recipes/' + (id ? (id + '/') : '') + ((name && name !== '') ? `?name=${name}` : '');
    const headers = { 'Content-Type': 'application/json' };
    const body = payload ? JSON.stringify(payload) : undefined;
    const finalOptions = Object.assign({}, { headers, method, body });
    return fetch(url, finalOptions)
        .then((response: Response) => {
            const { status } = response;
            const isValid = status >= 200 && status <= 299;
            const notFound = status === 404;
            if (!isValid || notFound) {
                return Promise.reject({ response })
            }

            return isValid
                ? response
                : response.json
                    ? response
                        .json()
                        .then((data) => Promise.reject({ response: data, status }))
                    : response;
        })
        .then((receivedResponse) => {
            const response = receivedResponse as Response;
            if (SUCCESS_RESPONSE_CODES_NO_DATA.has(response.status)) {
                return Promise.resolve();
            }
            return parseResponse(response);
        })
        .catch(({ response, status }) => {
            const requestMethod = finalOptions?.method || '-';
            const reqDetails = `${requestMethod} ${url} ${status}`;
            return Promise.reject(
                response
                    ? response
                    : new Error(`Response not available (${reqDetails})`)
            );
        });
};

export default {
    request,
};
