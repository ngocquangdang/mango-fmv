

export type Choice = { text: string; nextClipId: string }

export type Clip = {
  id: string
  title: string
  videoUrl: string
  isDecisionPoint: boolean
  isCompleted?: boolean
  decisionTime?: number
  hotspots?: any[]
  choices?: Choice[]
  nextClipId?: string | null
}

export type StoryData = {
  projectTitle: string
  startClipId: string
  clips: Record<string, Clip>
}

export const storyData = (): StoryData => {
  return {
    projectTitle: "Chapter 1: Wanna See You Again",
    startClipId: "clip_home",
    clips: {
      clip_home: {
        id: "clip_home",
        title: "My Home",
        videoUrl:
          "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        isDecisionPoint: true,
        decisionTime: 5,
        isCompleted: true,
        hotspots: [
          {
            id: "hs1",
            type: "single",
            x: 0.32,
            y: 0.58,
            r: 20,
            label: "Investigate",
            start: 5,
            end: 40,
            nextClipId: "clip_hold",
          },
          {
            id: "hs2",
            type: "single",
            x: 0.41,
            y: 0.62,
            r: 20,
            label: "Investigate",
            start: 10,
            end: 40,
            nextClipId: "clip_jump",
          },
          {
            id: "hs3",
            type: "dynamic",
            start: 15,
            end: 35,
            nextClipId: "clip_exploring",
            easing: "linear",
            keyframes: [
              { t: 15.0, x: 0.15, y: 0.30, r: 18 },
              { t: 25.0, x: 0.20, y: 0.33, r: 18 },
              { t: 35.0, x: 0.27, y: 0.36, r: 18 },
            ],
          },
        ],
        nextClipId: "clip_exploring",
      },
      clip_exploring: {
        id: "clip_exploring",
        title: "Exploring Home",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        isDecisionPoint: false,
        isCompleted: true,
        nextClipId: "clip_sweet_girl",
      },
      clip_sweet_girl: {
        id: "clip_sweet_girl",
        title: "The Sweet Girl",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        isDecisionPoint: true,
        decisionTime: 5.5,
        choices: [
          { text: "Hold Her", nextClipId: "clip_hold" },
          { text: "Jump with Her", nextClipId: "clip_jump" },
        ],
      },
      clip_hold: {
        id: "clip_hold",
        title: "Hold Her",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        isDecisionPoint: false,
        // nextClipId: "clip_sympathy",
      },
      clip_jump: {
        id: "clip_jump",
        title: "Jump with Her",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        isDecisionPoint: false,
        nextClipId: "clip_sympathy",
      },
      clip_sympathy: {
        id: "clip_sympathy",
        title: "A Mutual Sympathy",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        isDecisionPoint: false,
        nextClipId: null,
      },
    },
  };
}
