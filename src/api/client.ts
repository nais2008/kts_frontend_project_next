import axios from "axios"

const BASE_URL = "https://api.github.com/"
const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || ""

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `token ${TOKEN}`,
  },
})
