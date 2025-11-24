import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import { UserProvider } from "./features/user/context/user-provider";
import { useVideoPlayerContext } from "./contexts";
import { VideoPlayerProvider } from "./contexts/video-player-provider";

import VideoPlayer from "./features/video-player";
import { useUserContext } from "./features/user/context";
import HomeScreen from "./features/home";
import Project from "./features/project";
import BackIcon from "./components/icon/back-icon";
import Note from "./features/note";

function App() {
  const { loading } = useUserContext();
  const { type, quitPlayer, setType } = useVideoPlayerContext();

  const backgroundImage = "/src/assets/bg.png";
  const handleBack = () => {
    if (type === "interactive") {
      return quitPlayer();
    }
    setType("intro");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {type !== "intro" && (
        <div className="absolute top-5 left-5 p-4 z-10 cursor-pointer">
          <BackIcon onClick={handleBack} width="4vw" height="4vw" className="max-w-[64px]" />
        </div>
      )}
      {(() => {
        switch (type) {
          case "story":
            return <Project />;
          case "journal":
            return <Note />;
          case "ranking":
          case "playAgain":
          case "intro":
            return <HomeScreen />;
        }
      })()}
      <VideoPlayer />
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
