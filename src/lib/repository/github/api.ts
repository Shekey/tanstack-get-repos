import { requestHandler } from "@/lib/requestHandler/requestHandler";
import { DefaultAxiosRequestConfig, GetReposParams, Repo, User } from "./types";
import { GitHubClient } from "./config";

export class GitHub_API {
  userName: string;
  constructor(userName: string) {
    this.userName = userName;
  }
  public async getRepos(params: GetReposParams) {
    return requestHandler<GetReposParams, Repo[]>((params) => {
      const { signal, ...rest } = params || {};
      return GitHubClient.get(`users/${this.userName}/repos`, {
        params: {
          ...rest,
        },
        signal: signal || undefined,
        headers: {
          Authorization: import.meta.env.VITE_GITHUB_API_TOKEN,
        },
      });
    })(params);
  }
  public async getReposByName(name: string, params: DefaultAxiosRequestConfig) {
    return requestHandler<DefaultAxiosRequestConfig, User[]>((params) =>
      GitHubClient.get(
        `search/repositories?q=${name} in:name owner:${this.userName}`,
        {
          signal: params?.signal,
        }
      )
    )(params);
  }

  public async getRepo() {
    console.log("getRepo");
  }
}
