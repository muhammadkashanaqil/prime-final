// Browser-only adapter for the existing FastAPI service. No application API or database changes.
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
export interface ChatResult {
  answer: string;
  session_id: string;
  history: ChatMessage[];
}
export const FASTAPI_CHAT_URL =
  process.env.NEXT_PUBLIC_FASTAPI_CHAT_URL ||
  "https://prime-chatbot-tau.vercel.app/chat";
export function cleanHistory(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is ChatMessage =>
      Boolean(
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.length > 0 &&
        item.content.length <= 8000,
      ),
    )
    .slice(-12);
}
export async function requestChat(
  message: string,
  history: ChatMessage[],
  sessionId: string,
  signal: AbortSignal,
): Promise<ChatResult> {
  const response = await fetch(FASTAPI_CHAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      history: cleanHistory(history),
      session_id: sessionId,
    }),
    signal,
  });
  if (!response.ok)
    throw new Error(
      "The assistant couldn’t respond just now. Please try again or contact our team.",
    );
  const data = await response.json();
  const answer =
    typeof data.answer === "string"
      ? data.answer
      : typeof data.output === "string"
        ? data.output
        : "";
  if (!answer.trim())
    throw new Error(
      "The assistant returned an empty response. Please try again.",
    );
  return {
    answer,
    session_id:
      typeof data.session_id === "string" ? data.session_id : sessionId,
    history: cleanHistory(data.history),
  };
}
