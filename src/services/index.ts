import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults } from 'axios'
import {
    API_ENDPOINT,
    USER_ACCESS_TOKEN_KEY,
    USER_REFRESH_TOKEN_KEY,
} from './constants'

export class Services {
    private readonly instance: AxiosInstance

    public constructor() {
        this.instance = Services.createInstance({
            baseURL: new URL('/api/', API_ENDPOINT).toJSON(),
        })

        Services.setRequestInterceptors(this.instance)
        Services.setResponseInterceptors(this.instance)

        /* services */
    }

    static createInstance(params?: CreateAxiosDefaults) {
        return axios.create(params)
    }

    static setRequestInterceptors(instance: AxiosInstance) {
        instance.interceptors.request.use((config) => {
            const accessToken = Services.getAccessToken()

            if (accessToken) {
                config.headers.setAuthorization(`Bearer ${accessToken}`)
            }

            return config
        })
    }

    static setResponseInterceptors(instance: AxiosInstance) {
        instance.interceptors.response.use(
            (config) => config,
            async function (error: AxiosError) {
                const refreshToken = Services.getRefreshToken()

                /* prettier-ignore */
                if(
                    !error.response ||
                    error.response.config.skipRequestInterceptor ||

                    error.response.status !== 401 ||

                    !refreshToken
                ) {
                    return Promise.reject(error)
                }

                /**
                 * Здесь должна была быть логика обновления токена пользователя.
                 */

                return Promise.reject(error)
            }
        )
    }

    static getAccessToken() {
        return localStorage.getItem(USER_ACCESS_TOKEN_KEY) || ''
    }

    static getRefreshToken() {
        return localStorage.getItem(USER_REFRESH_TOKEN_KEY) || ''
    }
}

const SERVICES = new Services()
const useServices = () => SERVICES

export { useServices }
