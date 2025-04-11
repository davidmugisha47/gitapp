import { GitHubUser } from "../services/githubService";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  CalendarIcon,
  Users,
  Bookmark,
  GitFork,
  MapPin,
  Link as LinkIcon,
  Mail,
  Building,
} from "lucide-react";
interface ProfileCardProps {
  user: GitHubUser;
}
const ProfileCard = ({ user }: ProfileCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-md overflow-hidden animate-peek-a-boo">
      <CardHeader className="bg-github-blue p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 border-2 border-white shadow-md">
            <AvatarImage src={user.avatar_url} alt={user.login} />
            <AvatarFallback>
              {user.login.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-white">
            <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
            <p className="text-gray-200">@{user.login}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {user.bio && <p className="text-gray-700 mb-4">{user.bio}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex space-x-6">
            <div className="flex items-center space-x-1 text-gray-700">
              <Users size={18} />
              <span>{user.followers} followers</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-700">
              <span>{user.following} following</span>
            </div>
          </div>
          <div className="flex space-x-6">
            <div className="flex items-center space-x-1 text-gray-700">
              <Bookmark size={18} />
              <span>{user.public_repos} repositories</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-700">
              <GitFork size={18} />
              <span>{user.public_gists} gists</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {user.location && (
            <div className="flex items-center space-x-2 text-gray-700">
              <MapPin size={16} className="text-gray-500" />
              <span>{user.location}</span>
            </div>
          )}
          {user.blog && (
            <div className="flex items-center space-x-2 text-gray-700">
              <LinkIcon size={16} className="text-gray-500" />
              <a
                href={
                  user.blog.startsWith("http")
                    ? user.blog
                    : `https://${user.blog}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-github-blue hover:underline"
              >
                {user.blog}
              </a>
            </div>
          )}
          {user.email && (
            <div className="flex items-center space-x-2 text-gray-700">
              <Mail size={16} className="text-gray-500" />
              <a
                href={`mailto:${user.email}`}
                className="text-github-blue hover:underline"
              >
                {user.email}
              </a>
            </div>
          )}
          {user.company && (
            <div className="flex items-center space-x-2 text-gray-700">
              <Building size={16} className="text-gray-500" />
              <span>{user.company}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-gray-700">
            <CalendarIcon size={16} className="text-gray-500" />
            <span>Joined on {formatDate(user.created_at)}</span>
          </div>
        </div>
        <div className="mt-4">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-github-blue hover:underline"
          >
            View Profile on GitHub
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
export default ProfileCard;
