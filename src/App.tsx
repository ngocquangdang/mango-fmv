import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import { UserProvider } from "./features/user/context/user-provider";
import { useVideoPlayerContext } from "./contexts";
import { VideoPlayerProvider } from "./contexts/video-player-provider";

import VideoPlayer from "./features/video-player";
import { useUserContext } from "./features/user/context";
import FlowChart from "./features/flow-chart/flow-chart";
import { ArrowBigLeftDash } from "lucide-react";

function App() {
  const { loading } = useUserContext();
  const { type, quitPlayer } = useVideoPlayerContext();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {type === "interactive" && (
        <div className="absolute top-5 left-5 p-4 z-10">
          <ArrowBigLeftDash
            className="w-10 h-10 text-white cursor-pointer"
            onClick={quitPlayer}
          />
        </div>
      )}
      <VideoPlayer />
      <FlowChart />
    </div>
  );
}
function AppInner() {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <VideoPlayerProvider>
          <App />
        </VideoPlayerProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
export default AppInner;
