export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    bio: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
  }
  export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    fork: boolean;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    forks_count: number;
    open_issues_count: number;
    topics: string[];
    created_at: string;
    updated_at: string;
    pushed_at: string;
  }
  export interface GitHubContribution {
    date: string;
    count: number;
  }
  export const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching GitHub user:", error);
      throw error;
    }
  };

  export const fetchUserRepositories = async (username: string): Promise<GitHubRepo[]> => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching repositories:", error);
      throw error;
    }

  };
  export const fetchUserContributions = async (username: string): Promise<GitHubContribution[]> => {

    const mockData: GitHubContribution[] = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      mockData.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 10)
      });
    }
    return mockData;
  };
  