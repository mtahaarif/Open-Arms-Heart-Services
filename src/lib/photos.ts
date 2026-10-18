/**
 * Intrinsic size + average colour for every photo in /public/images.
 * Lets <Photo> emit real width/height attributes and paint a colour placeholder
 * while the optimised image loads — without shipping blur data in the JS bundle.
 * Regenerate if photos are added or replaced.
 */
export const photoMeta: Record<string, readonly [width: number, height: number, color: string]> = {
  "/images/activities-coloring.jpg": [1600, 1131, "#a39b83"],
  "/images/aide-smiling-patient.jpg": [1600, 1131, "#928977"],
  "/images/bench-sea.jpg": [1600, 1067, "#7a909c"],
  "/images/breakfast-family.jpg": [1600, 900, "#aba48e"],
  "/images/caregiver-portrait.jpg": [1600, 900, "#4c4746"],
  "/images/celebration.jpg": [1600, 1067, "#706a58"],
  "/images/child-smiling.jpg": [1600, 2131, "#ac9e8c"],
  "/images/companion-care.jpg": [1600, 1131, "#818776"],
  "/images/family-baking.jpg": [1600, 900, "#9f9e8d"],
  "/images/friends-talking.jpg": [1600, 1067, "#8c7562"],
  "/images/grandpa-granddaughter.jpg": [1600, 1067, "#654f4a"],
  "/images/hands.jpg": [1600, 2406, "#867f72"],
  "/images/hero-caregiver-laughing.jpg": [1600, 1131, "#8d927e"],
  "/images/homemaker.jpg": [1600, 1067, "#838076"],
  "/images/nurse-blood-pressure.jpg": [1600, 2207, "#ab7e82"],
  "/images/nurses-team.jpg": [1600, 2083, "#a4abbb"],
  "/images/occupational-therapy.jpg": [1600, 1131, "#7d6f57"],
  "/images/pediatric-walker.jpg": [1600, 2400, "#7b7b84"],
  "/images/personal-care.jpg": [1600, 1067, "#846e56"],
  "/images/personal-supports.jpg": [1600, 1066, "#b5b2a5"],
  "/images/physical-therapy.jpg": [1600, 1068, "#60645d"],
  "/images/residential-habilitation.jpg": [1600, 2400, "#9c9c98"],
  "/images/respite-child.jpg": [1600, 2400, "#5e5d43"],
  "/images/senior-portrait.jpg": [1600, 1067, "#595b5d"],
  "/images/seniors-smiling.jpg": [1600, 1067, "#9f8675"],
  "/images/skilled-nursing.jpg": [1600, 1067, "#aaa9ae"],
  "/images/social-work.jpg": [1600, 900, "#7c796a"],
  "/images/speech-therapy.jpg": [1600, 1067, "#7f8278"],
  "/images/therapy-play.jpg": [1600, 1067, "#a1a09b"],
  "/images/transportation.jpg": [1600, 1067, "#6a6758"],
  "/images/walker-autumn.jpg": [1600, 2133, "#6d7054"],
};
