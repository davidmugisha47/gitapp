import { useState } from "react";
import GitHubSearch from "../components/GitHubSearch";
import ProfileCard from "../components/ProfileCard";
import RepositoryList from "../components/RepositoryList";
import ContributionGraph from "../components/ContributionGraph";
import ErrorDisplay from "../components/ErrorDisplay";
import {
  GitHubUser,
  GitHubRepo,
  GitHubContribution,
  fetchGitHubUser,
  fetchUserRepositories,
  fetchUserContributions,
} from "../services/githubService";

const Index = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSearch = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await fetchGitHubUser(username);
      setUser(userData);
      const reposData = await fetchUserRepositories(username);
      setRepositories(reposData);
      const contributionsData = await fetchUserContributions(username);
      setContributions(contributionsData);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      setError(
        "Failed to fetch GitHub profile. Please check the username and try again."
      );
      setUser(null);
      setRepositories([]);
      setContributions([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-github-gray">
      <header className="w-full bg-github-darkblue text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold">GitHub Profile Explorer</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <GitHubSearch onSearch={handleSearch} isLoading={loading} />
        </div>
        {error && <ErrorDisplay message={error} />}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin h-10 w-10 border-4 border-github-blue border-t-transparent rounded-full" />
          </div>
        )}
        {user && !loading && (
          <div className="space-y-6">
            <ProfileCard user={user} />
            {repositories.length > 0 && (
              <RepositoryList repositories={repositories} />
            )}
            {contributions.length > 0 && (
              <ContributionGraph contributions={contributions} />
            )}
          </div>
        )}
        {!user && !loading && !error && (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">
              Search for a GitHub profile
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter a GitHub username above to explore their profile,
              repositories, and activities.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
export default Index;
