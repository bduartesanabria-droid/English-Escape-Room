import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI client (User-Agent header required by AI Studio guidelines)
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Pedagogical fallback knowledge base for instant resilience
const fallbackPedagogy: Record<string, {
  rule: string;
  hint: string;
  blueprint: string;
}> = {
  'room1_p1': {
    rule: "In Present Simple, third-person singular subjects (He / She / It / 'Dr. Aris') require adding '-s' or '-es' to the verb (works). Meanwhile, plural subjects like 'the security gates' require the plural form of the verb to be ('are').",
    hint: "Check both clauses: 'Dr. Aris' is singular (He), but 'security gates' has an -s at the end (Plural).",
    blueprint: "He/She/It + Verb(-s/-es) | Plural Subject + are"
  },
  'room1_p2': {
    rule: "Daily habits and schedules with third-person subjects take '-s' or '-es' (unlocks, drinks, reviews, locks). Never leave routine actions in base form for singular he/she.",
    hint: "Review Dr. Vane's morning protocol in chronological order: unlocks -> drinks -> reviews -> locks.",
    blueprint: "Subject (Dr. Vane) + Verb(+s)"
  },
  'room2_p1': {
    rule: "We use Past Simple for finished actions in the past with a specific time marker ('yesterday' -> 'burst'), but Present Continuous (am/is/are + verb-ing) for ongoing actions happening right now ('right now' -> 'is flowing').",
    hint: "Look at the time markers: 'yesterday' indicates completed past, while 'right now' signals an action in progress.",
    blueprint: "Past Simple (finished past) vs. Present Continuous (is/are + -ing)"
  },
  'room2_p2': {
    rule: "Use Past Continuous (was/were + -ing) for a longer background action in progress ('was repairing') interrupted by a sudden, completed Past Simple event ('sounded').",
    hint: "Which action was already ongoing when the interruption happened? The technician was repairing when alarms sounded.",
    blueprint: "While + Past Continuous (was/were + -ing), Past Simple (interruption)"
  },
  'room3_p1': {
    rule: "We use 'MUST NOT' for strict prohibitions (things forbidden by safety code), whereas 'SHOULD' is used for helpful recommendations or advice.",
    hint: "Think about whether crossing the lethal laser wire is strictly forbidden or merely optional advice.",
    blueprint: "MUST NOT (Prohibition / Danger) vs. SHOULD (Recommendation)"
  },
  'room3_p2': {
    rule: "We use 'DON'T HAVE TO' when something is NOT necessary (absence of obligation), and 'CAN' to express capability or permission.",
    hint: "If the backup generator is already operating, shutting down the reactor is unnecessary ('don't have to').",
    blueprint: "DON'T HAVE TO (No obligation) + CAN (Permitted capability)"
  },
  'room4_p1': {
    rule: "In First Conditional sentences expressing cause and effect, the IF-clause takes the Present Simple ('flashes'), while the result/instruction clause takes an Imperative base verb ('press') or 'will + verb'.",
    hint: "Never use 'will' inside the conditional if-clause! Use Present Simple in the condition.",
    blueprint: "If + Present Simple (condition), Imperative Base Verb (command)"
  },
  'room4_p2': {
    rule: "Master Protocol Synthesis: Combine modal necessity ('must calibrate'), temporal contrast ('are stabilizing now'), and past completion ('completed') to authorize airlock depressurization.",
    hint: "Verify subject-verb agreement and ensure modal verbs are followed immediately by the bare infinitive (base verb).",
    blueprint: "Modal + Base Verb + Continuous State + Finished Past"
  }
};

/**
 * Endpoint: /api/evaluate-puzzle
 * Evaluates puzzle answers and provides immediate pedagogical feedback.
 */
app.post('/api/evaluate-puzzle', async (req, res) => {
  try {
    const {
      puzzleId,
      roomIndex,
      topic,
      promptText,
      userAnswer,
      correctAnswer,
      roomName,
      unlockedItemName,
    } = req.body;

    const isCorrect = String(userAnswer).trim().toLowerCase() === String(correctAnswer).trim().toLowerCase();

    // If Gemini is available, generate dynamic pedagogical feedback
    if (ai) {
      try {
        const prompt = `
Context:
Room: ${roomName} (Room ${Number(roomIndex) + 1})
Grammar Topic: ${topic}
Riddle / Prompt: "${promptText}"
User Answer: "${userAnswer}"
Target Correct Answer: "${correctAnswer}"
Is Evaluated Correct: ${isCorrect}
Unlocked Item on Correct: ${unlockedItemName || 'null'}

Tasks:
1. Provide a response following the exact schema:
{
  "isCorrect": ${isCorrect},
  "feedbackMessage": string,
  "hint": string,
  "unlockedItem": ${isCorrect ? `"${unlockedItemName || 'Keycard'}"` : 'null'}
}
2. Tone: Encouraging, mysterious like an Escape Room master, pedagogical, and concise.
3. If isCorrect is false: DO NOT just say "Wrong". Provide a short, clear, and encouraging explanation of the specific grammar rule in English (e.g. explain subject-verb agreement, why 3rd person singular adds -s, or difference between must not and should).
4. If isCorrect is true: Congratulate the player on their precise grammatical deduction with atmospheric escape room flavor and explain why their syntax was accurate.
5. Provide a progressive hint that nudges the learner without revealing the raw solution directly.
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: `You are the AI Game Master and English Pedagogical Tutor for a Point & Click Web Escape Room game called "English Escape Room".
Your goal is to guide players through escaping rooms by testing their knowledge of English grammar (Verb To Be, Daily Routines, Past/Continuous Tenses, and Modal Verbs).
Always return strict JSON conforming to the schema:
{
  "isCorrect": boolean,
  "feedbackMessage": string,
  "hint": string,
  "unlockedItem": string | null
}`,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                isCorrect: { type: Type.BOOLEAN },
                feedbackMessage: { type: Type.STRING },
                hint: { type: Type.STRING },
                unlockedItem: { type: Type.STRING, nullable: true },
              },
              required: ['isCorrect', 'feedbackMessage', 'hint'],
            },
          },
        });

        const text = response.text?.trim();
        if (text) {
          const parsed = JSON.parse(text);
          return res.json({
            ...parsed,
            isCorrect,
            unlockedItem: isCorrect ? (unlockedItemName || null) : null,
          });
        }
      } catch (geminiError) {
        console.error('Gemini API call failed, falling back to pedagogical rule engine:', geminiError);
      }
    }

    // High quality deterministic pedagogical fallback
    const fallback = fallbackPedagogy[puzzleId] || {
      rule: `Check your subject-verb agreement and tense markers for ${topic}.`,
      hint: `Remember the rules for ${topic}: look closely at who is performing the action and the time reference.`,
      blueprint: topic,
    };

    if (isCorrect) {
      return res.json({
        isCorrect: true,
        feedbackMessage: `Linguistic syntax verified! Your mastery of ${topic} has bypassed the security cipher. Access granted.`,
        hint: `Great deduction! The system locks have yielded to your grammatical accuracy.`,
        unlockedItem: unlockedItemName || null,
        syntaxBlueprint: fallback.blueprint,
      });
    } else {
      return res.json({
        isCorrect: false,
        feedbackMessage: `Not quite! ${fallback.rule}`,
        hint: fallback.hint,
        unlockedItem: null,
        syntaxBlueprint: fallback.blueprint,
      });
    }
  } catch (err: any) {
    console.error('Evaluation endpoint error:', err);
    res.status(500).json({
      error: 'Evaluation error',
      message: err?.message || 'Internal error',
    });
  }
});

/**
 * Endpoint: /api/request-hint
 * Progressive hint generator for the tactical deck.
 */
app.post('/api/request-hint', async (req, res) => {
  try {
    const { puzzleId, topic, promptText, hintTier } = req.body;
    const tier = Number(hintTier) || 1;

    if (ai) {
      try {
        const prompt = `
The user is playing the English Escape Room and requested a hint.
Topic: ${topic}
Prompt: "${promptText}"
Hint Tier: ${tier} (1 = subtle mysterious clue, 2 = clear grammatical rule reminder, 3 = strong structural hint without giving the exact word away).

Return JSON:
{
  "hint": string,
  "pedagogicalRule": string
}
`;
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'You are the AI Game Master and English Pedagogical Tutor. Provide concise, encouraging clues tailored for English learners.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                hint: { type: Type.STRING },
                pedagogicalRule: { type: Type.STRING },
              },
              required: ['hint', 'pedagogicalRule'],
            },
          },
        });
        const text = response.text?.trim();
        if (text) {
          return res.json(JSON.parse(text));
        }
      } catch (err) {
        console.error('Gemini hint generation failed:', err);
      }
    }

    const fallback = fallbackPedagogy[puzzleId];
    if (fallback) {
      if (tier === 1) {
        return res.json({
          hint: fallback.hint,
          pedagogicalRule: `Focus topic: ${topic}`,
        });
      } else {
        return res.json({
          hint: `${fallback.hint} Key Rule: ${fallback.rule}`,
          pedagogicalRule: fallback.blueprint,
        });
      }
    }

    return res.json({
      hint: `Analyze the sentence carefully. Notice the subject and the time markers associated with ${topic}.`,
      pedagogicalRule: `Target: ${topic}`,
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message });
  }
});

// Setup Vite middleware in dev or serve static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[English Escape Room] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
