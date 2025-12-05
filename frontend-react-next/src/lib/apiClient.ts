import { getAccessToken, setAccessToken } from "../auth/tokenStore";



const API_URL = process.env.BACKEND_URL;

let getAccessTokenInternal: () => string | null = getAccessToken;
let setAccessTokenInternal: (t: string | null) => void = setAccessToken;

export function registerAuthHandlers(
    getToken: () => string | null,
    setToken: (t: string | null) => void
) {
    getAccessTokenInternal = getToken;
    setAccessTokenInternal = setToken;
}
type ApiOption = RequestInit & {
    retryOn401?: boolean;
};
async function doFetch(
    url: string,
    options: ApiOption,
    token: string | null
) {
    return fetch(url, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {})
        },
        credentials: "include",
        body: options.body
    });
}
export async function refreshAccessToken() {
    try {

        const res = await fetch(`${API_URL}/api/auth/refreshToken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clientType: 'web',
            }),
            credentials: "include"
        });

        if (!res.ok) return false;

        // const data = await res.json();

        // const token: string | undefined =
        //     data?.accessToken || data?.data?.accessToken;

        // if (!token) return false;

        // setAccessTokenInternal(token);

        return true;
    } catch {
        return false;
    }
}
export async function apiFetch(path: string, options: ApiOption = {}) {
    if (!API_URL) throw new Error("Missing NEXT_PUBLIC_AUTH_LOCAL_IP");

    const url = `${API_URL}${path}`;
    const token = await getAccessTokenInternal();
    if (!token) console.log("errorr form token");
    console.log("curr token:", token);

    // initial request
    let res = await doFetch(url, options, token);

    // if expired → refresh and retry once
    if (res.status === 401 && options.retryOn401 !== false) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) return res;

        const newToken = getAccessTokenInternal();
        console.log("new token:", newToken);

        res = await doFetch(url, options, newToken);
    }

    return res;
}