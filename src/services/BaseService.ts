import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export abstract class BaseService {
    protected getRequest<T = any>(
        url: string,
        params?: any,
        config?: AxiosRequestConfig
    ) {
        return BaseService.extractData(
            this.instance.get<T>(url, { ...config, params })
        )
    }

    protected postRequest<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ) {
        return BaseService.extractData(this.instance.post<T>(url, data, config))
    }

    protected postFormRequest<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ) {
        return BaseService.extractData(
            this.instance.postForm<T>(url, data, config)
        )
    }

    protected putRequest<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ) {
        return BaseService.extractData(this.instance.put<T>(url, data, config))
    }

    protected putFormRequest<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ) {
        return BaseService.extractData(
            this.instance.putForm<T>(url, data, config)
        )
    }

    protected patchRequest<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ) {
        return BaseService.extractData(
            this.instance.patch<T>(url, data, config)
        )
    }

    protected patchFormRequest<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ) {
        return BaseService.extractData(
            this.instance.patchForm<T>(url, data, config)
        )
    }

    protected deleteRequest<T = any>(
        url: string,
        params?: any,
        config?: AxiosRequestConfig
    ) {
        return BaseService.extractData(
            this.instance.delete<T>(url, { ...config, params })
        )
    }

    protected constructor(protected readonly instance: AxiosInstance) {}

    static async extractData<T>(response: Promise<AxiosResponse<T>>) {
        const { data } = await response

        return data
    }
}
