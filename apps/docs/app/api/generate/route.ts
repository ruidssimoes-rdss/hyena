import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI features are not configured.' },
        { status: 503 }
      );
    }

    const { vibe } = await request.json();

    if (!vibe || typeof vibe !== 'string' || vibe.trim().length < 3) {
      return NextResponse.json(
        { error: 'Please provide a vibe description (at least 3 characters).' },
        { status: 400 }
      );
    }

    if (vibe.length > 500) {
      return NextResponse.json(
        { error: 'Vibe description too long (max 500 characters).' },
        { status: 400 }
      );
    }

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: `You are an expert design system generator. Given a vibe description, create a complete, cohesive design token system.

VIBE DESCRIPTION:
"${vibe.trim()}"

Generate a complete design token system as JSON. Be creative and interpret the vibe holistically - consider the mood, energy, and aesthetic implications.

REQUIREMENTS:
1. Colors should feel cohesive and intentional
2. If the vibe suggests "dark mode" or "dark", make surface.background dark and surface.foreground light
3. If the vibe suggests "light mode" or "light" or "clean", make surface.background light and surface.foreground dark
4. Primary color should complement the overall mood
5. Semantic colors (success, warning, error, info) should work well with the palette
6. Typography should match the vibe (modern = sans-serif like Inter; editorial = serif like Merriweather; playful = rounded like Nunito)
7. Radius should match the feel (brutalist = 0; soft/friendly = 12-16; minimal = 4-6)
8. Shadows should match the depth feel (flat/minimal = subtle; elevated/glass = prominent)

OUTPUT FORMAT (JSON only, no other text):
{
  "name": "Generated theme name based on vibe",
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
      { "id": "sans", "name": "Sans", "value": "Font Name" },
      { "id": "mono", "name": "Mono", "value": "Monospace Font Name" }
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
  },
  "meta": {
    "vibeInterpretation": "Brief 1-2 sentence description of how you interpreted the vibe"
  }
}

Output ONLY valid JSON. No markdown code blocks, no explanations before or after.`,
        },
      ],
    });

    // Extract text content
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from AI');
    }

    // Parse JSON (handle potential markdown code blocks)
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

    const tokens = JSON.parse(jsonText);

    return NextResponse.json({
      success: true,
      tokens,
      vibeInterpretation: tokens.meta?.vibeInterpretation,
    });
  } catch (error) {
    console.error('Generate API error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate design system. Please try again.' },
      { status: 500 }
    );
  }
}
