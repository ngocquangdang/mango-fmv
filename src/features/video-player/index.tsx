import { useVideoPlayerContext } from "../../contexts";

export default function VideoPlayer() {
  const { type } = useVideoPlayerContext();
  return (
    <div
      id="interactive-video"
      className={`${type === "interactive" ? "block" : "hidden"}`}
    ></div>
  );
}
