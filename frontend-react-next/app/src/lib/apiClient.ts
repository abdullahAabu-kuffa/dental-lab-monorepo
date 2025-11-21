
const API_URL = process.env.NEXT_PUBLIC_AUTH_LOCAL_IP;

type ApiOption = RequestInit & {
    retryOn401?: boolean;
};

export function getToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
}

export function setToken(token: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token);
    }
}

async function refreshAccessToken() {
    try {
        const oldToken = getToken();

        const res = await fetch(`${API_URL}/api/auth/refreshToken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(oldToken ? { Authorization: `Bearer ${oldToken}` } : {})
            }
        });

        if (!res.ok) return false;

        const data = await res.json();
        if (!data?.newAccessToken) return false;

        setToken(data.newAccessToken);
        return true;
    } catch {
        return false;
    }
}

export async function apiFetch(path: string, options: ApiOption = {}) {
    const url = `http://localhost:3001${path}`;
    const token = getToken();
    console.log("apiFetch called with URL: ", API_URL);
    const res = await fetch(url, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {})
        },
        body: options.body
    });

    // Handle expired access token
    if (res.status === 401 && options.retryOn401 !== false) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) return res;

        const newToken = getToken();

        // Retry request with fresh token
        return fetch(url, {
            method: options.method || "GET",
            headers: {
                "Content-Type": "application/json",
                ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
                ...(options.headers || {})
            },
            body: options.body
        });
    }

    return res;
}
