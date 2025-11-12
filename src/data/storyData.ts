export type Choice = { text: string; nextSceneId: string };

export type Scene = {
  id: string;
  title: string;
  videoUrl: string;
  isDecisionPoint: boolean;
  subtitleUrl?: string;
  decisionTime?: number;
  defaultChoice?: string;
  triggerType?: "branch" | "hotspot";
  questionTitle?: string;
  questionDescription?: string;
  countdown?: number;
  hotspots?: any[];
  choices?: Choice[];
  nextSceneId?: string | null;
  status?: string;
  watchingSecond?: number;
  duration?: number;
  completedAt?: string | null;
  previousSceneId?: string | null;
};

export type StoryData = {
  id: string;
  title: string;
  description: string;
  startSceneId: string;
  scenes: Record<string, Scene>;
};

export const storyData = (): StoryData => {
  return {
    id: "chapter_1",
    title: "Chapter 1: Wanna See You Again",
    description:
      "You are a detective trying to solve a case. You are given a list of suspects and you need to find the one who is guilty.",
    startSceneId: "clip_sweet_girl",
    scenes: {
      clip_home: {
        id: "clip_home",
        title: "My Home",
        videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        isDecisionPoint: true,
        decisionTime: 5,
        triggerType: "hotspot",
        status: "IN_PROGRESS",
        hotspots: [
          {
            id: "pot_clip_hold",
            type: "single",
            x: 0.32,
            y: 0.58,
            r: 40,
            label: "Investigate",
            start: 5,
            end: 40,
            nextSceneId: "pot_clip_hold",
            config: {
              title: "Investigate",
              description: "Investigate the home",
              link: "https://www.google.com",
              icon: "https://www.google.com/favicon.ico",
            },
          },
          {
            id: "pot_clip_jump",
            type: "single",
            x: 0.41,
            y: 0.62,
            r: 40,
            label: "Investigate",
            start: 10,
            end: 40,
            nextSceneId: "pot_clip_jump",
            config: {
              title: "Investigate",
              description: "Investigate the home",
              link: "https://www.google.com",
              icon: "https://www.google.com/favicon.ico",
            },
          },
          {
            id: "pot_clip_exploring",
            type: "dynamic",
            start: 15,
            end: 35,
            nextSceneId: "pot_clip_exploring",
            easing: "linear",
            keyframes: [
              { t: 15.0, x: 0.15, y: 0.3, r: 40 },
              { t: 25.0, x: 0.2, y: 0.33, r: 40 },
              { t: 35.0, x: 0.27, y: 0.36, r: 40 },
            ],
            config: {
              title: "Investigate",
              description: "Investigate the home",
              link: "https://www.google.com",
              icon: "https://www.google.com/favicon.ico",
            },
          },
        ],
        nextSceneId: "clip_exploring",
      },
      pot_clip_hold: {
        id: "pot_clip_hold",
        title: "PotHold Her",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        isDecisionPoint: false,
        previousSceneId: "clip_home",
        triggerType: "hotspot",
      },
      pot_clip_jump: {
        id: "pot_clip_jump",
        title: "Pot Jump with Her",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        isDecisionPoint: false,
        previousSceneId: "clip_home",
        triggerType: "hotspot",
      },
      pot_clip_exploring: {
        id: "pot_clip_exploring",
        title: "Pot Exploring Home",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        isDecisionPoint: false,
        previousSceneId: "clip_home",
        triggerType: "hotspot",
      },
      clip_exploring: {
        id: "clip_exploring",
        title: "Exploring Home",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        isDecisionPoint: false,
        triggerType: "branch",
        nextSceneId: "clip_sweet_girl",
      },
      clip_sweet_girl: {
        id: "clip_sweet_girl",
        title: "The Sweet Girl",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        isDecisionPoint: true,
        decisionTime: 3,
        defaultChoice: "clip_hold",
        countdown: 10,
        triggerType: "branch",
        questionTitle: "What do you want to do?",
        questionDescription: "Choose an option to continue",
        choices: [
          { text: "Hold Her", nextSceneId: "clip_hold" },
          { text: "Jump with Her", nextSceneId: "clip_jump" },
        ],
      },
      clip_hold: {
        id: "clip_hold",
        title: "Hold Her",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        isDecisionPoint: false,
        triggerType: "branch",
        nextSceneId: "clip_sympathy",
      },
      clip_jump: {
        id: "clip_jump",
        title: "Jump with Her",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        isDecisionPoint: false,
        triggerType: "branch",
        nextSceneId: "clip_sympathy",
      },
      clip_sympathy: {
        id: "clip_sympathy",
        title: "A Mutual Sympathy",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        isDecisionPoint: false,
        triggerType: "branch",
        nextSceneId: null,
      },
    },
  };
};
