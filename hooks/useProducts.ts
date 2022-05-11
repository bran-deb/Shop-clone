import useSWR, { SWRConfiguration } from 'swr'

import { IProduct } from '../interfaces'


// export const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())


// export const useProducts = <T>(url: string, config: SWRConfiguration = {}) => {         //uso de genericos
export const useProducts = (url: string, config: SWRConfiguration = {}) => {
    // const { data, error } = useSWR<IProduct[]>(`/api${url}`, fetcher, config)
    const { data, error } = useSWR<IProduct[]>(`/api${url}`, config)
    // const { data, error } = useSWR<T>(`/api${url}`, config)                          //uso de genericos

    return {
        products: data || [],
        isLoading: !data && !error,
        isError: error,
    }
}