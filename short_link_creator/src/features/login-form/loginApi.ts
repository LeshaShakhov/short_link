import {instance} from "../../api/api";
import axios, {AxiosError, AxiosPromise} from "axios";

export type LoginResponse = {
    access_token: string,
    token_type: string
}

export async function login(username:string, password: string): Promise<LoginResponse> {
    try {
        const response = await instance.post<LoginResponse>(
            'login',
            `username=${username}&password=${password}`
        )

        return response.data
    } catch (error) {
        const err = error as AxiosError<{detail: string}>
        throw new Error(err.message, {cause: `${err?.response?.data?.detail}`})
    }
}