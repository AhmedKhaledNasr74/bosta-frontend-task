import axios from "axios";

export const api = axios.create({
    baseURL: "https://dummyjson.com",
    headers: { "Content-Type": "application/json" },
    timeout: 5000,
});

export function handleAxiosError(error: unknown) {
    if (axios.isAxiosError(error)) {
        return {
            message: error.response?.data?.message ?? error.message,
            status: error.response?.status ?? null,
        };
    }
    return { message: "An unknown error occurred", status: null };
}
