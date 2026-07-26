import { json } from '@remix-run/cloudflare';
import { buildSystemPrompt } from '~/components/chatbot/system-prompt';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';
const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY = 20;

export const action = async ({ request, context }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  const apiKey = context?.cloudflare?.env?.GROQ_API_KEY;
  if (!apiKey) {
    return json(
      { error: 'Chat is temporarily unavailable.' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const messages = Array.isArray(body?.messages) ? body.messages : null;
  if (!messages || messages.length === 0 || messages.length > MAX_HISTORY) {
    return json({ error: 'Invalid message history.' }, { status: 400 });
  }

  const clean = messages
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_CHARS),
    }));

  if (clean.length === 0 || clean[clean.length - 1].role !== 'user') {
    return json({ error: 'Invalid message history.' }, { status: 400 });
  }

  const groqPayload = {
    model: MODEL,
    messages: [{ role: 'system', content: buildSystemPrompt() }, ...clean],
    temperature: 0.4,
    max_tokens: 400,
  };

  let upstream;
  try {
    upstream = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(groqPayload),
    });
  } catch {
    return json({ error: 'Could not reach the chat service.' }, { status: 502 });
  }

  if (upstream.status === 429) {
    return json(
      { error: 'The chat is busy right now. Try again in a moment.' },
      { status: 429 }
    );
  }

  if (!upstream.ok) {
    return json({ error: 'The chat service returned an error.' }, { status: 502 });
  }

  const data = await upstream.json().catch(() => null);
  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    return json({ error: 'Empty response from chat service.' }, { status: 502 });
  }

  return json({ reply });
};

export const loader = () => json({ error: 'Method not allowed' }, { status: 405 });
