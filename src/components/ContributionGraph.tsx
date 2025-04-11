import { GitHubContribution } from "../services/githubService";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
interface ContributionGraphProps {
  contributions: GitHubContribution[];
}
const ContributionGraph = ({ contributions }: ContributionGraphProps) => {
  const sortedContributions = [...contributions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-gray-100";
    if (count < 3) return "bg-green-100";
    if (count < 6) return "bg-green-300";
    if (count < 9) return "bg-green-500";
    return "bg-green-700";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  
  return (
    <Card
      className="w-full max-w-3xl mx-auto mt-6 animate-peek-a-boo"
      style={{ animationDelay: "0.3s" }}
    >
      <CardHeader>
        <CardTitle className="text-xl">Contribution Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-7 gap-1">
            {sortedContributions.map((contribution) => (
              <Tooltip key={contribution.date}>
                <TooltipTrigger asChild>
                  <div
                    className={`w-full aspect-square rounded-sm ${getContributionColor(
                      contribution.count
                    )} hover:ring-2 hover:ring-github-blue transition-all cursor-pointer`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">
                    {contribution.count} contributions
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(contribution.date)}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
        <div className="flex items-center justify-end mt-4 text-sm">
          <span className="mr-2">Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-100 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
          </div>
          <span className="ml-2">More</span>
        </div>
      </CardContent>
    </Card>
  );
};
export default ContributionGraph;
