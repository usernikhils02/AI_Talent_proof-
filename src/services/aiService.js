import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Validates the user input against prompt injection attempts.
 */
function isSafePrompt(prompt) {
  const dangerousPatterns = [
    /ignore all previous instructions/i,
    /system prompt/i,
    /you are now dan/i,
    /jailbreak/i,
    /bypass rules/i
  ];
  return !dangerousPatterns.some(pattern => pattern.test(prompt));
}

/**
 * Generates an AI response for the programming tutor chat.
 */
export async function getTutorResponse(question, languageContext) {
  if (!isSafePrompt(question)) {
    return {
      text: "⚠️ Security Guardrail Triggered: The input contains potentially harmful or restricted instructions.",
      tokens: 0
    };
  }

  const prompt = `You are a helpful programming tutor in a strict coding assessment platform.
The student is currently learning/taking a test in ${languageContext}.
They asked: "${question}"

Provide a concise hint or conceptual explanation. DO NOT give them the direct code answer or solution to the problem. Keep your response under 3 sentences.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Simulating token count as Gemini SDK doesn't always expose it synchronously in simple calls easily in v1
    const estimatedTokens = Math.round((prompt.length + text.length) / 4); 

    return {
      text,
      tokens: estimatedTokens
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Sorry, the AI tutor is currently unavailable. Please try again later.",
      tokens: 0
    };
  }
}

/**
 * Generates project-grounded interview questions based on GitHub metadata.
 */
export async function generateDynamicInterviewQuestions(repoMetadata, roleTitle) {
  const frameworks = repoMetadata.detectedFrameworks?.length 
    ? repoMetadata.detectedFrameworks.join(', ') 
    : 'a modern web stack';
  
  const deps = (repoMetadata.dependencies || []).slice(0, 8).join(', ') || 'various libraries';

  const prompt = `You are a strict, senior Technical HR Recruiter.
A candidate has submitted a GitHub repository for the role of ${roleTitle}.
The repository is built using: ${repoMetadata.primaryLanguage}, ${frameworks}.
Key dependencies include: ${deps}.

Generate exactly 3 tough, highly specific architectural interview questions based on this exact technology stack. 
Do not be generic. Ask about trade-offs, state management, API latency, or concurrency specifically related to their stack.

Format your response exactly as a JSON array of objects with this schema:
[
  { "id": "q-1", "category": "Architecture", "difficulty": "Intermediate", "question": "..." },
  ...
]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean markdown block if it wraps the JSON
    const jsonStr = text.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini API Error generating questions:", error);
    return null;
  }
}
