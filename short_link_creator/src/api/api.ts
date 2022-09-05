import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://79.143.31.216/'
});

export enum ResponseCodes{
    Success = 200,
    Error = 400,
}
