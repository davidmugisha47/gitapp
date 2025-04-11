import { useState } from "react";
import { GitHubRepo } from "../services/githubService";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, GitFork, AlertCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
interface RepositoryListProps {
  repositories: GitHubRepo[];
}
const RepositoryList = ({ repositories }: RepositoryListProps) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("stars");

  const filteredRepos = repositories.filter((repo) => {
    if (filter === "all") return true;
    if (filter === "forks" && repo.fork) return true;
    if (filter === "sources" && !repo.fork) return true;
    return false;
  });

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sort === "stars") return b.stargazers_count - a.stargazers_count;
    if (sort === "forks") return b.forks_count - a.forks_count;
    if (sort === "updated")
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    return 0;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  
  return (
    <div
      className="w-full max-w-3xl mx-auto mt-6 animate-peek-a-boo"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Repositories ({filteredRepos.length})
        </h2>
        <div className="flex space-x-2">
          <Tabs
            defaultValue="all"
            onValueChange={setFilter}
            className="w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
              <TabsTrigger value="forks">Forks</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stars">Stars</SelectItem>
              <SelectItem value="forks">Forks</SelectItem>
              <SelectItem value="updated">Updated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {sortedRepos.length > 0 ? (
          sortedRepos.map((repo) => (
            <Card
              key={repo.id}
              className="overflow-hidden border border-gray-200 hover:border-github-blue transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-github-blue hover:underline"
                    >
                      {repo.name}
                    </a>
                    {repo.fork && (
                      <Badge variant="outline" className="ml-2">
                        <GitFork size={12} className="mr-1" />
                        Fork
                      </Badge>
                    )}
                    <p className="text-gray-600 mt-1">
                      {repo.description || "No description available"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center mt-3 text-sm text-gray-600 gap-x-4 gap-y-2">
                  {repo.language && (
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-github-blue mr-1"></div>
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Star size={16} className="mr-1" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center">
                    <GitFork size={16} className="mr-1" />
                    <span>{repo.forks_count}</span>
                  </div>
                  {repo.open_issues_count > 0 && (
                    <div className="flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      <span>{repo.open_issues_count} issues</span>
                    </div>
                  )}
                  <div>Updated on {formatDate(repo.updated_at)}</div>
                </div>
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {repo.topics.slice(0, 5).map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="bg-github-gray text-github-darkgray"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            No repositories found matching the current filters.
          </div>
        )}
      </div>
    </div>
  );
};
export default RepositoryList;
