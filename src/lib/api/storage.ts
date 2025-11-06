import { STORAGE_PREFIX } from './constants'

export const saveLocalParams = (params: Record<string, string>) => {
    Object.keys(params).forEach((key) => {
        localStorage.setItem(`${STORAGE_PREFIX}${key}`, params[key])
    })
}

export const getLocalParam = (key: string): string | null => {
    return localStorage.getItem(`${STORAGE_PREFIX}${key}`)
}

export const removeLocalParam = (key: string) => {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
}

export const clearLocalStorage = () => {
    const keys = Object.keys(localStorage)
    keys.forEach((key) => {
        if (key.startsWith(STORAGE_PREFIX)) {
            localStorage.removeItem(key)
        }
    })
}
