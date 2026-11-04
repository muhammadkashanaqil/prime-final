"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  MessageCircle,
  X,
  RotateCcw,
  Plus,
} from "lucide-react";
import { cleanHistory, requestChat, type ChatMessage } from "@/lib/chat-client";
const STORAGE_KEY = "prime-fastapi-conversation";
export default function ChatWidget({
  welcomeMessage = "Hello. What would you like to make work better?",
}: {
  welcomeMessage?: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [lastAttempt, setLastAttempt] = useState<{
    text: string;
    history: ChatMessage[];
  } | null>(null);
  const session = useRef("");
  const controller = useRef<AbortController | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    session.current = crypto.randomUUID();
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
      if (saved && typeof saved.session_id === "string") {
        session.current = saved.session_id;
        setMessages(cleanHistory(saved.history));
      }
    } catch {
      /* Private browsing can disable storage. */
    }
    return () => {
      mounted.current = false;
      controller.current?.abort();
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);
  useEffect(() => {
    if (open && logRef.current)
      logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, busy, error, open]);
  function persist(history: ChatMessage[]) {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          session_id: session.current,
          history: cleanHistory(history),
        }),
      );
    } catch {
      /* The conversation remains available for this page visit. */
    }
  }
  async function send(text: string, previous: ChatMessage[] = messages) {
    const value = text.trim();
    if (!value || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setError("");
    setInput("");
    setLastAttempt({ text: value, history: previous });
    const pending = [...previous, { role: "user" as const, content: value }];
    setMessages(pending);
    controller.current = new AbortController();
    timeout.current = setTimeout(() => controller.current?.abort(), 45000);
    try {
      const response = await requestChat(
        value,
        previous,
        session.current,
        controller.current.signal,
      );
      if (!mounted.current) return;
      session.current = response.session_id;
      const next = [
        ...pending,
        { role: "assistant" as const, content: response.answer },
      ];
      setMessages(next);
      persist(response.history.length ? response.history : next);
      setLastAttempt(null);
    } catch (err) {
      if (mounted.current)
        setError(
          err instanceof Error && err.name !== "AbortError"
            ? err.message
            : "The response took too long. Please try again, or speak with our team.",
        );
    } finally {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = null;
      busyRef.current = false;
      if (mounted.current) setBusy(false);
    }
  }
  function reset() {
    controller.current?.abort();
    setMessages([]);
    setError("");
    setLastAttempt(null);
    setInput("");
    session.current = crypto.randomUUID();
    persist([]);
    inputRef.current?.focus();
  }
  return (
    <div className="prime-chat">
      {open && (
        <section
          className="prime-chat-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="prime-chat-title"
        >
          <header className="prime-chat-header">
            <span className="prime-chat-monogram" aria-hidden="true">
              P<span>↗</span>
            </span>
            <div>
              <h2 id="prime-chat-title">Ask Prime</h2>
              <p>AI assistant · Built around your questions</p>
            </div>
            <button type="button" onClick={close} aria-label="Close assistant">
              <X size={19} />
            </button>
          </header>
          <div
            className="prime-chat-log"
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
          >
            <div className="prime-chat-message prime-chat-assistant">
              <span className="sr-only">Assistant: </span>
              {welcomeMessage}
            </div>
            {!messages.length && (
              <div className="prime-chat-starters">
                <span>A PLACE TO START</span>
                {[
                  "What can you automate for my business?",
                  "How does a project with Prime work?",
                  "I’d like to discuss a project.",
                ].map((question) => (
                  <button
                    type="button"
                    key={question}
                    onClick={() => send(question)}
                    disabled={busy}
                  >
                    {question}
                    <ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
            )}
            {messages.map((message, i) => (
              <div
                className={`prime-chat-message prime-chat-${message.role}`}
                key={`${i}-${message.role}`}
              >
                <span className="sr-only">
                  {message.role === "user" ? "You" : "Assistant"}:{" "}
                </span>
                {message.content}
              </div>
            ))}
            {busy && (
              <div className="prime-chat-thinking" role="status">
                Thinking<span aria-hidden="true">…</span>
              </div>
            )}
            {error && (
              <div className="prime-chat-error" role="alert">
                <p>{error}</p>
                {lastAttempt && (
                  <button
                    type="button"
                    onClick={() => send(lastAttempt.text, lastAttempt.history)}
                    disabled={busy}
                  >
                    <RotateCcw size={14} /> Try again
                  </button>
                )}
                <Link href="/contact" onClick={close}>
                  Contact the team ↗
                </Link>
              </div>
            )}
          </div>
          <div className="prime-chat-compose">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
            >
              <label htmlFor="prime-chat-message" className="sr-only">
                Your message
              </label>
              <input
                id="prime-chat-message"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask us anything about your project…"
                maxLength={4000}
                autoComplete="off"
                disabled={busy}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
              >
                <ArrowUp size={20} />
              </button>
            </form>
            <div className="prime-chat-foot">
              <span>
                AI can make mistakes.{" "}
                <Link href="/contact" onClick={close}>
                  Talk to a person ↗
                </Link>
              </span>
              <button
                type="button"
                onClick={reset}
                disabled={busy}
                aria-label="Start a new conversation"
                title="New conversation"
              >
                <Plus size={17} />
              </button>
            </div>
          </div>
        </section>
      )}
      <button
        ref={triggerRef}
        className="prime-chat-trigger"
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? "Close assistant" : "Chat with Prime"}
        aria-expanded={open}
      >
        {open ? (
          <X size={21} />
        ) : (
          <>
            <MessageCircle size={21} />
            <span>Ask Prime</span>
          </>
        )}
      </button>
    </div>
  );
}
