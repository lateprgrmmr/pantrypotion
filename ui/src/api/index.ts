/* eslint-disable @typescript-eslint/no-explicit-any */

type FetchMethod = 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE' | 'DOWNLOAD';

function buildRequest(
    _url: string,
    method: string,
    data: Record<string, any> | null = null,
    body?: FormData
): RequestInit {

    const options: RequestInit = {
        headers: {},
        method: method === 'DOWNLOAD' ? data === null ? 'GET' : 'POST' : method,
    };

    if (method !== 'GET') {
        (options.headers as HeadersInit) = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            ...options.headers,
        }
    }

    if (method !== 'GET' && body) {
        options.body = body;
    } else if (method !== 'GET' && data) {
        options.body = JSON.stringify(data);
    }

    return options;
}

async function sendRequest(url: string, options: RequestInit): Promise<Response | null> {
    console.log('Sending request to:', url, 'with options:', options);
    try {
        const response = await fetch(url, options);
        console.log('Response status:', response.body);
        return response;
    } catch (ex) {
        console.error("Error sending request:", ex, url, options);
        return null;
    }
};

async function sendToApi<T>(url: string, method: FetchMethod, data: Record<string, any> | null): Promise<T> {

    const req: RequestInit = buildRequest(url, method, data);
    console.log('Requestsadfs options:', url, req, method, data);

    const resp: Response | null = await sendRequest(url, req);
    console.log('Response received:', resp);
    if (!resp) {
        throw new Error("Network response was not ok");
    }
    return resp.json();

};

export async function getFromApi<T>(
    url: string,
    data: Record<string, any> | null = null
): Promise<T> {
    console.log(' aslkdfj GET request to:', url, 'with data:', data);
    return sendToApi<T>(url, 'GET', data);
}

export async function postToApi<T>(
    url: string,
    data: Record<string, any> | null = null
): Promise<T> {
    return sendToApi<T>(url, 'POST', data);
}

export async function putToApi<T>(
    url: string,
    data: Record<string, any> | null = null
): Promise<T> {
    return sendToApi<T>(url, 'PUT', data);
}

export async function deleteFromApi<T>(
    url: string,
    data: Record<string, any> | null = null
): Promise<T> {
    return sendToApi<T>(url, 'DELETE', data);
}

export async function patchToApi<T>(
    url: string,
    data: Record<string, any> | null = null
): Promise<T> {
    return sendToApi<T>(url, 'PATCH', data);
}
