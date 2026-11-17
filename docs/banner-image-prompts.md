# Banner image prompts

One image per page banner (four for the home page, which cross-fades between them). Each image shows different people, so no two banners look alike.

## Size and composition (all images)

- **Aspect ratio: 3:1.** Export at **3000 × 1000 px** (at least 2400 × 800), JPG.
  - The banners are full-width and about 560 px tall. That's roughly 3.4:1 on a 1920 px screen and 2.4:1 on a 1440 px laptop. A 3:1 image covers both with only a little cropping.
  - **Midjourney:** add `--ar 3:1 --style raw`.
  - **Tools that can't do 3:1** (ChatGPT / DALL·E, Gemini, Firefly): use the widest option (16:9 or 3:2). Keep the people in the middle band from top to bottom, because the top and bottom will be cropped.
- **People sit in one side third only.** Each prompt says which side. The headline is centered over a darkened middle, so that area should be calm, softly blurred background.
  - On phones the banner shows a narrow slice of the image. The site keeps that slice on the people's side.
- **The site tints every banner dark plum.** Soft, bright, natural-light photos work best; avoid dark or moody shots.
- **Before using a result**, check hands, faces, and any wheelchair or walker for AI mistakes.

## Shared style: paste after every prompt

> Photorealistic editorial documentary photograph, candid and unposed, people not looking at the camera. Bright, airy home in Central Florida with natural window light, soft lavender and plum accents in clothing and décor, a few green tropical houseplants. Shallow depth of field, 35 mm lens at f/2, natural skin texture, warm and dignified mood. Ultra-wide 3:1 panoramic composition; the people fill only the [SIDE] third of the frame and the rest is calm, softly out-of-focus interior with no busy detail. No text, no logos, no watermarks, no brand names.

**Negative prompt** (if the tool has one): `text, letters, logo, watermark, distorted hands, extra fingers, warped wheelchair, plastic skin, uncanny face, oversaturated, hospital ward, clinical background, posed stock-photo grin, looking at camera, dark moody lighting`

Replace `[SIDE]` with the side given for each image.

---

## Home page: 4 slides (cross-fade)

### 1. Home, slide 1: children with disabilities (side: **right**)
`home-1.jpg`

> A Black woman caregiver in her late 20s wearing lavender scrubs kneels on a living-room rug, building a colourful block tower with a cheerful 6-year-old Hispanic boy who has Down syndrome; both are laughing as the tower wobbles, toys scattered nearby.

### 2. Home, slide 2: adults with disabilities (side: **left**)
`home-2.jpg`

> A Korean American man in his mid-20s who uses a manual wheelchair cooks at a lowered kitchen counter, stirring a pot, while a White male support worker in his 40s with a short beard and a plum polo shirt hands him chopped vegetables; they share an easy laugh.

### 3. Home, slide 3: family and grandparents (side: **right**)
`home-3.jpg`

> A Native American grandfather in his 70s with a long silver braid sits on a shaded front-porch swing, reading a picture book to his 7-year-old granddaughter who leans against his shoulder, pointing at the page; late-afternoon light.

### 4. Home, slide 4: seniors at home (side: **left**)
`home-4.jpg`

> An Indian American woman in her late 70s in a soft cardigan sits on a sofa holding a cup of tea and smiling, while an Arab American woman caregiver in her 30s wearing a soft lavender hijab and scrubs sits beside her, listening warmly to her story.

---

## About us: "Your family. Your goals. Our heart." (side: **right**)
`about.jpg`

> An African American father in his 80s and his adult son in his 40s sit side by side at a kitchen table, laughing together as they look through an old family photo album; a cup of coffee beside them, warm afternoon light.

## Our services: "Care for everyday needs. Support for individual goals." (side: **left**)
`services.jpg`

> A Hispanic male home health aide in his 30s wearing plum scrubs walks slowly beside a White woman in her 80s who uses a rollator walker, down a bright hallway in her home; his hand hovers supportively near her elbow and she is smiling, mid-conversation.

## Careers: "Great careers change lives." (side: **right**)
`careers.jpg`

> Two caregivers in matching plum scrubs, a Filipino American woman in her 20s and a Black man in his 40s, laugh together as they walk up the path to a client's front door carrying a tote bag, morning sunlight and palm fronds in the background.

## Contact: "Let's find the support that feels right." (side: **left**)
`contact.jpg`

> A Chinese American woman in her 50s sits at a dining table talking on her phone, with a notepad and pen in front of her; she looks relieved and reassured. Her elderly mother is softly out of focus in an armchair behind her.

## FAQ: "Answers for your family." (side: **right**)
`faq.jpg`

> A Samoan American mother in her 30s and her teenage daughter sit close together on a couch reading something on a laptop; the mother points at the screen and explains while the daughter smiles and nods.

## 404 page: optional, no people (side: **centre**)
`not-found.jpg`

> The front door of a Central Florida home standing open, warm golden light spilling out onto a welcome mat, potted plants on either side, early evening. Calm and inviting.

The 404 banner currently has no photo, because it ships with every page. If you'd like one, it will be loaded lazily.

---

## Who appears where

| Image | People | Side |
| --- | --- | --- |
| Home 1 | Black woman (20s, caregiver); Hispanic boy (6, Down syndrome) | Right |
| Home 2 | Korean American man (20s, wheelchair user); White man (40s, support worker) | Left |
| Home 3 | Native American grandfather (70s); granddaughter (7) | Right |
| Home 4 | Indian American woman (70s); Arab American woman (30s, caregiver) | Left |
| About | African American father (80s); son (40s) | Right |
| Services | Hispanic man (30s, aide); White woman (80s, rollator) | Left |
| Careers | Filipino American woman (20s); Black man (40s), both caregivers | Right |
| Contact | Chinese American woman (50s); her mother (80s, background) | Left |
| FAQ | Samoan American mother (30s); teenage daughter | Right |

## When the images are ready

Drop the files into `public/images/banners/` with the names above and ask Claude to wire them up. The wiring covers:

- compressing them;
- setting each banner's crop on phones toward its "side";
- updating the photo metadata and the README credits.
