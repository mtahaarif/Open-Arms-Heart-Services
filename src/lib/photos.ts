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
  "/images/hero-home.jpg": [2200, 1467, "#b4ada4"],
  "/images/live-scan.jpg": [1600, 1067, "#1e243b"],
  "/images/nurse-home-visit.jpg": [1600, 1067, "#aaa9ae"],
  "/images/senior-conversation.jpg": [1600, 1067, "#898476"],
  "/images/service-apd.jpg": [1600, 1067, "#7d7771"],
  "/images/service-cbc.jpg": [1600, 1068, "#747165"],
  "/images/service-home-care.jpg": [1600, 1067, "#89837e"],
  "/images/service-veterans.jpg": [1600, 1067, "#897d6b"],
  "/images/service-vulnerable-adult.jpg": [1600, 1067, "#989082"],
};
