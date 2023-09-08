import { type Doc, type APISpaceXResponse } from '../types/api.js'

const API_URL = 'https://api.spacexdata.com/v5/launches'

export const getLaunchById = async ({id}: {id:string}) => {
  const res = await fetch(`${API_URL}/${id}`)
  const launch = await res.json() as Doc
  return launch
}

export const getLatestLaunches = async () => {
  const res = await fetch(`${API_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: {},
      options: {
        sort: {
          date_unix: 'asc'
        },
        limit: 12
      }
    })
  })
  const { docs: launches } = (await res.json()) as APISpaceXResponse

  return launches
}