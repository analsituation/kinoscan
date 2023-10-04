'use server'

import { IMovie } from '@/customTypes'

export const searchFilms = async (
  query: string
): Promise<{ data: IMovie[]; total: number } | 403 | 524 | undefined> => {
  try {
    const searchByNameUrl = process.env.API_URL! + `?name=${query}`
    const searchByEnNameUrl = process.env.API_URL! + `?enName=${query}`
    const searchByAltNameUrl = process.env.API_URL! + `?alternativeName=${query}`
    const api_key = process.env.API_KEY!

    const response = await fetch(searchByNameUrl, {
      method: 'GET',
      headers: {
        'X-API-KEY': api_key
      },
      next: {
        revalidate: 86400
      },
      signal: AbortSignal.timeout(6000)
    })

    if (response.status === 403) {
      return 403
    }

    if (!response.ok) {
      throw new Error('Ошибка HTTP ' + response.ok)
    }

    if (response.ok) {
      const data = await response.json()
      return {
        data: data.docs,
        total: data.total
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'TimeoutError' || error.name === 'AbortError') {
        return 524
      }
    } else return
  }
}

export const dataFetchWithId = async (id: number) => {
  try {
    const url = process.env.API_URL! + `/${id}`
    const api_key = process.env.API_KEY!
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': api_key
      },
      next: {
        revalidate: 86400
      },
      signal: AbortSignal.timeout(8000)
    })

    if (response.status === 403) {
      return 403
    }

    if (!response.ok) {
      throw new Error('Ошибка HTTP ' + response.ok)
    }

    if (response.ok) {
      const data = await response.json()
      return data
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'TimeoutError' || error.name === 'AbortError') {
        return 524
      }
    } else return error
  }
}

export const dataFetch = async (query: string) => {
  try {
    const url = process.env.API_URL! + `${query}`
    const api_key = process.env.API_KEY!
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': api_key
      },
      next: {
        revalidate: 86400
      },
      signal: AbortSignal.timeout(10000)
    })

    if (response.status === 403) {
      return 403
    }

    if (!response.ok) {
      throw new Error('Ошибка HTTP ' + response.ok)
    }

    if (response.ok) {
      const data = await response.json()
      return data.docs
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'TimeoutError' || error.name === 'AbortError') {
        return 524
      }
    } else return error
  }
}
