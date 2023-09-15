'use server'
export const searchFilms = async (query: string) => {
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
      }
    })

    if (!response.ok) {
      throw new Error('Ошибка HTTP ' + response.status)
    }

    const data = await response.json()
    return data.docs
  } catch (error) {
    console.error('Ошибка:', error)
  }
}
