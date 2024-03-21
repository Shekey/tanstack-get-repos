import axios from "axios";

export const GitHubClient = axios.create({
  baseURL: "https://api.github.com",
  timeout: 1000,
  headers: {
    Authorization: import.meta.env.VITE_GITHUB_API_TOKEN,
    "X-GitHub-Api-Version": "2022-11-28",
    Accept: "application/vnd.github+json",
  },
});
