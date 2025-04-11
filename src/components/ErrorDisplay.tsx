import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
interface ErrorDisplayProps {
  message: string;
}
const ErrorDisplay = ({ message }: ErrorDisplayProps) => {
  return (
    <Alert variant="destructive" className="w-full max-w-3xl mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
export default ErrorDisplay;
