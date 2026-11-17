/**
 * Intrinsic size + average colour for every photo in /public/images.
 * Lets <Photo> emit real width/height attributes and paint a colour placeholder
 * while the optimised image loads — without shipping blur data in the JS bundle.
 * Regenerate if photos are added or replaced.
 */
export const photoMeta: Record<string, readonly [width: number, height: number, color: string]> = {
  "/images/adult-wheelchair-community.jpg": [1600, 1067, "#7c6b6a"],
  "/images/careers-caregivers.jpg": [1800, 1200, "#8d7a6a"],
  "/images/caregiver-companion.jpg": [1600, 1067, "#7b767f"],
  "/images/family-game-night.jpg": [1600, 1063, "#846c58"],
  "/images/founder-shantana-johnson.jpg": [928, 1122, "#6c594f"],
  "/images/friends-smiling.jpg": [1600, 1067, "#8e7b70"],
  "/images/grandmother-granddaughter.jpg": [1600, 1064, "#503e32"],
  "/images/hands-mission.jpg": [599, 900, "#877f72"],
  "/images/live-scan.jpg": [1600, 1067, "#1e243b"],
  "/images/nurse-home-visit.jpg": [1600, 1067, "#aaa9ae"],
  "/images/senior-conversation.jpg": [1600, 1067, "#898476"],
  "/images/service-apd.jpg": [1600, 1067, "#7d7771"],
  "/images/service-cbc.jpg": [1600, 1068, "#747165"],
  "/images/service-home-care.jpg": [1600, 1067, "#89837e"],
  "/images/service-veterans.jpg": [1600, 1067, "#897d6b"],
  "/images/service-vulnerable-adult.jpg": [1600, 1067, "#989082"],
  "/images/therapy-play.jpg": [1600, 1067, "#a4a49e"],
  "/images/family-baking.jpg": [1600, 900, "#a09f8e"],
  "/images/personal-supports.jpg": [1600, 1066, "#b8b5a7"],
  "/images/grandpa-granddaughter.jpg": [1600, 1067, "#5f4c45"],
  "/images/friends-talking.jpg": [1600, 1067, "#8f7966"],
  "/images/activities-coloring.jpg": [1600, 1131, "#a8a089"],
  "/images/caregiver-portrait.jpg": [1600, 900, "#4d4847"],
  "/images/nurse-blood-pressure.jpg": [1200, 1655, "#a97e81"],
  "/images/nurses-team.jpg": [1200, 1562, "#aab1bf"],
};
