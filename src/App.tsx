import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<h1>404 NOT FOUND!</h1>} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </QueryClientProvider>
  );
}
export default App;
