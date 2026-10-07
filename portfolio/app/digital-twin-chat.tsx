'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';

type Message = { id: string; role: 'user' | 'assistant'; content: string };
type ChatResponse = { answer?: string; error?: string };
const introduction: Message = {
  id: 'intro', role: 'assistant',
  content: 'Hi, I’m Tung’s AI assistant. I can help you explore his projects, technical skills, and career history. What would you like to know?',
};
const questions = ['What has Tung worked on?', 'What are his main skills?', 'Tell me about his Vue experience.', 'Has he built real-time applications?'];

function conversationContext(messages: Message[]) {
  const recent = messages.filter(({ id }) => id !== 'intro').slice(-11);
  while (recent.length > 1 && (recent[0].role !== 'user' || recent.reduce((total, message) => total + message.content.length, 0) > 7000)) recent.shift();
  return recent.map(({ role, content }) => ({ role, content }));
}

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([introduction]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [failedQuestion, setFailedQuestion] = useState('');
  const conversationRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pendingRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);
  useEffect(() => {
    const element = conversationRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element?.scrollTo({ top: element.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [messages, isLoading]);

  async function ask(question: string) {
    const content = question.trim();
    if (!content || content.length > 1200 || pendingRef.current) return;
    pendingRef.current = true;
    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content };
    const previous = messages;
    const next = [...previous, userMessage];
    setMessages(next);
    setInput('');
    setError('');
    setFailedQuestion('');
    setIsLoading(true);
    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 95_000);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationContext(next) }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => null) as ChatResponse | null;
      if (!response.ok || typeof data?.answer !== 'string' || !data.answer.trim()) {
        throw new Error(data?.error || 'The assistant couldn’t respond. Please try again.');
      }
      setMessages([...next, { id: crypto.randomUUID(), role: 'assistant', content: data.answer }]);
    } catch (cause) {
      setMessages(previous);
      setFailedQuestion(content);
      setInput(content);
      setError(cause instanceof Error && cause.name !== 'AbortError'
        ? cause.message : 'The assistant is taking longer than expected. Please try again.');
    } finally {
      window.clearTimeout(timeout);
      controllerRef.current = null;
      pendingRef.current = false;
      setIsLoading(false);
      if (inputRef.current?.form?.contains(document.activeElement)) {
        inputRef.current.focus({ preventScroll: true });
      }
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }
  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void ask(input);
    }
  }

  return (
    <section className="digital-twin section" id="digital-twin" aria-labelledby="twin-heading">
      <div className="container twin-layout">
        <div className="twin-intro">
          <p className="eyebrow">05 — Digital Twin</p>
          <h2 id="twin-heading">A conversation<br />about my work.</h2>
          <p className="twin-intro-copy">Have a question about my experience? My AI assistant can help you find a project, explore my skills, or understand my career so far.</p>
          <a className="text-link" href="mailto:trongtung.kma@gmail.com">Prefer to talk to me? Send an email ↗</a>
          <p className="twin-privacy">Answers are based on my supplied CV. Messages are sent to OpenRouter and its model provider to generate a reply; this site doesn’t save your conversation.</p>
        </div>
        <div className="chat-shell">
          <header className="chat-header">
            <div className="chat-avatar" aria-hidden="true">lt.</div>
            <div><strong>Tung’s Digital Twin</strong><span>AI career assistant</span></div>
            {messages.length > 1 && <button type="button" disabled={isLoading} onClick={() => { setMessages([introduction]); setError(''); setInput(''); setFailedQuestion(''); }}>New chat</button>}
          </header>
          <div className="chat-conversation" ref={conversationRef} tabIndex={0} role="log" aria-live="polite" aria-relevant="additions" aria-label="Career conversation" aria-busy={isLoading}>
            {messages.map((message) => (
              <div className={'chat-message ' + message.role} key={message.id}>
                <span className="message-label">{message.role === 'assistant' ? 'Tung’s AI assistant' : 'You'}</span>
                <p>{message.content}</p>
              </div>
            ))}
            {isLoading && <div className="chat-message assistant" role="status"><span className="message-label">Finding an answer…</span><div className="typing-dots" aria-hidden="true"><i /><i /><i /></div></div>}
          </div>
          {messages.length === 1 && !isLoading && <div className="suggested-questions" aria-label="Suggested questions">{questions.map((question) => <button type="button" key={question} onClick={() => void ask(question)}>{question}<span aria-hidden="true">↗</span></button>)}</div>}
          <form className="chat-form" onSubmit={submit}>
            <label htmlFor="career-question" className="sr-only">Your career question</label>
            <textarea id="career-question" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={onKeyDown} maxLength={1200} rows={2} placeholder="Ask about a project or skill…" readOnly={isLoading} aria-describedby="chat-help" />
            <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send question">{isLoading ? 'Waiting' : 'Send'} <span aria-hidden="true">↑</span></button>
          </form>
          <div className="chat-meta" id="chat-help"><span>Enter to send · Shift + Enter for a new line</span><span>{input.length}/1,200</span></div>
          {error && <div className="chat-error" role="alert"><p>{error}</p><button type="button" onClick={() => void ask(failedQuestion)} disabled={isLoading}>Try again</button></div>}
          <p className="chat-disclaimer">AI can make mistakes. Check important details with me directly.</p>
        </div>
      </div>
    </section>
  );
}
