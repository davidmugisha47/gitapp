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
    following: number;
    public_repos: number;
    public_gists: number;
    followers: number;
    created_at: string;
    updated_at: string;
}

export interface GitHubRepo {
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
            throw new Error(`github api error!: ${response.status}`);
        }
    } catch (error) {
        console.error("error fetching git user:", error);
        throw error;
    }
};

export const fetchUserContributions = async (username: string): Promise<GitHubContribution[]> => {

    const mockData: GitHubContribution[] = [];
    const today = new Date();

    for (let index = 0; index < 30; index++) {
        const date = new Date(today);
        date.setDate(today.getDate() - index);
        mockData.push({
            date: date.toISOString().split('T')[0],
            count: Math.floor(Math.random() * 10)
        });
    }
    return mockData;
};