import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI features are not configured.' },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imageEntry = (formData as any).get('image');
    const image =
      imageEntry && typeof imageEntry === 'object' && 'arrayBuffer' in imageEntry
        ? (imageEntry as File)
        : null;

    if (!image) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(image.type)) {
      return NextResponse.json(
        { error: 'Invalid image type. Please upload JPEG, PNG, WebP, or GIF.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (image.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Image too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Convert to base64
    const buffer = await image.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const mediaType = image.type as
      | 'image/jpeg'
      | 'image/png'
      | 'image/webp'
      | 'image/gif';

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64,
              },
            },
            {
              type: 'text',
              text: `Analyze this UI screenshot and extract its design system characteristics to generate a complete token system.

ANALYSIS TASKS:
1. Identify the color palette (backgrounds, accents, text colors)
2. Infer the typography style (modern sans, classic serif, monospace, etc.)
3. Assess spacing density (tight, comfortable, spacious)
4. Evaluate border radius style (sharp, subtle, rounded, pill)
5. Analyze shadow/elevation style (flat, subtle, prominent, glass)
6. Determine overall mood/vibe

Based on your analysis, generate a complete design token system that captures the essence of this UI.

OUTPUT FORMAT (JSON only, no other text):
{
  "name": "Theme name based on the UI style",
  "analysis": {
    "dominantColors": ["#hex1", "#hex2", "#hex3"],
    "mood": "Brief description of the overall mood",
    "style": "Brief description of the design style"
  },
  "colors": {
    "brand": [
      { "id": "primary", "name": "Primary", "value": { "light": "#hexcolor", "dark": "#hexcolor" } },
      { "id": "accent", "name": "Accent", "value": { "light": "#hexcolor", "dark": "#hexcolor" } }
    ],
    "semantic": [
      { "id": "success", "name": "Success", "value": { "light": "#hexcolor", "dark": "#hexcolor" } },
      { "id": "warning", "name": "Warning", "value": { "light": "#hexcolor", "dark": "#hexcolor" } },
      { "id": "error", "name": "Error", "value": { "light": "#hexcolor", "dark": "#hexcolor" } },
      { "id": "info", "name": "Info", "value": { "light": "#hexcolor", "dark": "#hexcolor" } }
    ],
    "neutral": {
      "baseColor": "#hexcolor",
      "scale": {
        "50": "#hexcolor",
        "100": "#hexcolor",
        "200": "#hexcolor",
        "300": "#hexcolor",
        "400": "#hexcolor",
        "500": "#hexcolor",
        "600": "#hexcolor",
        "700": "#hexcolor",
        "800": "#hexcolor",
        "900": "#hexcolor",
        "950": "#hexcolor"
      }
    },
    "surface": {
      "background": { "light": "#hexcolor", "dark": "#hexcolor" },
      "foreground": { "light": "#hexcolor", "dark": "#hexcolor" },
      "card": { "light": "#hexcolor", "dark": "#hexcolor" },
      "muted": { "light": "#hexcolor", "dark": "#hexcolor" },
      "mutedForeground": { "light": "#hexcolor", "dark": "#hexcolor" },
      "border": { "light": "#hexcolor", "dark": "#hexcolor" }
    }
  },
  "typography": {
    "families": [
      { "id": "sans", "name": "Sans", "value": "Suggested font name" },
      { "id": "mono", "name": "Mono", "value": "Suggested monospace font" }
    ],
    "sizes": [
      { "name": "xs", "size": 12, "lineHeight": 16 },
      { "name": "sm", "size": 14, "lineHeight": 20 },
      { "name": "base", "size": 16, "lineHeight": 24 },
      { "name": "lg", "size": 18, "lineHeight": 28 },
      { "name": "xl", "size": 20, "lineHeight": 28 },
      { "name": "2xl", "size": 24, "lineHeight": 32 },
      { "name": "3xl", "size": 30, "lineHeight": 36 },
      { "name": "4xl", "size": 36, "lineHeight": 40 },
      { "name": "5xl", "size": 48, "lineHeight": 48 }
    ],
    "weights": [
      { "name": "normal", "value": 400 },
      { "name": "medium", "value": 500 },
      { "name": "semibold", "value": 600 },
      { "name": "bold", "value": 700 }
    ]
  },
  "spacing": {
    "baseUnit": 4,
    "scale": [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
  },
  "radius": {
    "base": number,
    "scale": [
      { "name": "none", "value": 0 },
      { "name": "sm", "value": number },
      { "name": "md", "value": number },
      { "name": "lg", "value": number },
      { "name": "xl", "value": number },
      { "name": "2xl", "value": number },
      { "name": "full", "value": 9999 }
    ]
  },
  "shadows": {
    "scale": [
      { "name": "sm", "value": "CSS box-shadow value" },
      { "name": "md", "value": "CSS box-shadow value" },
      { "name": "lg", "value": "CSS box-shadow value" },
      { "name": "xl", "value": "CSS box-shadow value" },
      { "name": "2xl", "value": "CSS box-shadow value" }
    ]
  },
  "animations": {
    "durations": [
      { "name": "fast", "value": 150 },
      { "name": "normal", "value": 200 },
      { "name": "slow", "value": 300 }
    ],
    "easings": [
      { "name": "default", "value": "cubic-bezier(0.4, 0, 0.2, 1)" },
      { "name": "in", "value": "cubic-bezier(0.4, 0, 1, 1)" },
      { "name": "out", "value": "cubic-bezier(0, 0, 0.2, 1)" },
      { "name": "inOut", "value": "cubic-bezier(0.4, 0, 0.2, 1)" }
    ]
  }
}

Extract actual colors you can see in the image. Make educated guesses for fonts based on the style. Generate a cohesive system that captures the UI's aesthetic.

Output ONLY valid JSON. No markdown code blocks, no explanations.`,
            },
          ],
        },
      ],
    });

    // Extract text content
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from AI');
    }

    // Parse JSON
    let jsonText = content.text.trim();

    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.slice(7);
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.slice(3);
    }
    if (jsonText.endsWith('```')) {
      jsonText = jsonText.slice(0, -3);
    }
    jsonText = jsonText.trim();

    const result = JSON.parse(jsonText);

    return NextResponse.json({
      success: true,
      tokens: result,
      analysis: result.analysis,
    });
  } catch (error) {
    console.error('Analyze image API error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to analyze image. Please try again.' },
      { status: 500 }
    );
  }
}
