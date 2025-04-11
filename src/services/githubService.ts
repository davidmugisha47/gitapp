export interface GitHubUser{
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
    following: number;
    public_repos: number;
    public_gists: number;
    followers: number;
    created_at: string;
    updated_at: string;
}

export interface GitHubRepo{
    id: number;
    html_url: string;
    name: string | null;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    full_name: string;
    fork: boolean; 
    following: number;
    watchers_count: number;
    forks_count: number;
    topics: string[];
    open_issues_count: number;
    created_at: string;
    updated_at: string;
}