import {instance, ResponseCodes} from "../../api/api";
import axios, {AxiosError, AxiosPromise} from "axios";

export type RegisterResponse = {
    data: {
    }
}

export async function register(username:string, password: string) {
    try {
        const response = await instance.post<RegisterResponse>(
            `register?username=${username}&password=${password}`,
        );
        return response.data
    } catch (error) {
        const err = error as AxiosError<{detail: string}>
        throw new Error(err.message, {cause: `${err?.response?.data?.detail}`})
    }
}