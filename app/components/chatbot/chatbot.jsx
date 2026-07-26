import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '~/components/icon';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { classes, msToNum } from '~/utils/style';
import styles from './chatbot.module.css';

const MAX_MESSAGES = 20;
const MAX_CHARS = 500;

const LINKIFY_RE = /(https?:\/\/[^\s<>()]+[^\s<>().,;:!?])|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

function withBreakHints(str) {
  const nodes = [];
  const segments = str.split(/([@.\/])/);
  segments.forEach((seg, i) => {
    nodes.push(seg);
    if (/[@.\/]/.test(seg) && i < segments.length - 1) nodes.push(<wbr key={`w${i}`} />);
  });
  return nodes;
}

function renderWithLinks(text) {
  const parts = [];
  let last = 0;
  let match;
  LINKIFY_RE.lastIndex = 0;
  while ((match = LINKIFY_RE.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const [full, url, email] = match;
    if (url) {
      parts.push(
        <a key={parts.length} href={url} target="_blank" rel="noopener noreferrer" className={styles.messageLink}>
          {withBreakHints(url)}
        </a>
      );
    } else if (email) {
      parts.push(
        <a key={parts.length} href={`mailto:${email}`} className={styles.messageLink}>
          {withBreakHints(email)}
        </a>
      );
    } else {
      parts.push(full);
    }
    last = match.index + full.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const GREETING = {
  role: 'assistant',
  content:
    "Hi! I'm an AI assistant that answers questions about Shivam's work using the info on this site. Ask me about his projects, skills, or experience.",
};

const SUGGESTIONS = [
  "What's Shivam's strongest project?",
  'What AI/ML tools has he worked with?',
  'How can I contact him?',
];

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);
  const textareaRef = useRef(null);

  const userMessageCount = messages.filter(m => m.role === 'user').length;
  const capped = userMessageCount >= MAX_MESSAGES;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, pending, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [open]);

  const send = useCallback(
    async textOverride => {
      const text = (textOverride ?? input).trim().slice(0, MAX_CHARS);
      if (!text || pending || capped) return;

      const nextHistory = [...messages, { role: 'user', content: text }];
      setMessages(nextHistory);
      setInput('');
      setPending(true);
      setError(null);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: nextHistory
              .filter(m => m.role === 'user' || m.role === 'assistant')
              .map(m => ({ role: m.role, content: m.content })),
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data?.reply) {
          setError(data?.error || 'Something went wrong. Try again.');
          setMessages(nextHistory);
        } else {
          setMessages([...nextHistory, { role: 'assistant', content: data.reply }]);
        }
      } catch {
        setError('Network error. Try again.');
        setMessages(nextHistory);
      } finally {
        setPending(false);
      }
    },
    [input, pending, capped, messages]
  );

  const onKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const remaining = MAX_CHARS - input.length;

  return (
    <>
      <Transition unmount in={open} timeout={msToNum(tokens.base.durationL)}>
        {({ visible, nodeRef }) => (
          <div
            ref={nodeRef}
            className={styles.backdrop}
            data-visible={visible}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </Transition>
      <button
        type="button"
        className={styles.trigger}
        data-open={open}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <Icon className={styles.triggerIcon} icon={open ? 'close' : 'chat'} />
      </button>
      <Transition unmount in={open} timeout={msToNum(tokens.base.durationL)}>
        {({ visible, nodeRef }) => (
          <div
            ref={nodeRef}
            className={styles.panel}
            data-visible={visible}
            role="dialog"
            aria-label="Chat with Shivam's AI assistant"
          >
            <header className={styles.header}>
              <div>
                <Text size="s" weight="medium" as="h2" className={styles.headerTitle}>
                  Ask about Shivam's work
                </Text>
                <Text size="xs" secondary as="p" className={styles.headerSubtitle}>
                  AI answers grounded in this site
                </Text>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close chat"
                onClick={() => setOpen(false)}
              >
                <Icon icon="close" />
              </button>
            </header>
            <div className={styles.messages} ref={listRef}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={classes(
                    styles.bubble,
                    m.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant
                  )}
                >
                  <Text size="s" as="p">
                    {m.role === 'assistant' ? renderWithLinks(m.content) : m.content}
                  </Text>
                </div>
              ))}
              {pending && (
                <div className={classes(styles.bubble, styles.bubbleAssistant, styles.typing)}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </div>
              )}
              {error && !pending && (
                <div className={styles.errorRow}>
                  <Text size="xs" as="p" className={styles.errorText}>
                    {error}
                  </Text>
                </div>
              )}
              {messages.length === 1 && !pending && (
                <div className={styles.suggestions}>
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      type="button"
                      className={styles.suggestion}
                      onClick={() => send(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {capped && (
                <div className={styles.errorRow}>
                  <Text size="xs" as="p" className={styles.errorText}>
                    You've reached the message limit for this session. Refresh to start a new chat.
                  </Text>
                </div>
              )}
            </div>
            <form
              className={styles.inputRow}
              onSubmit={e => {
                e.preventDefault();
                send();
              }}
            >
              <textarea
                ref={textareaRef}
                className={styles.textarea}
                rows={1}
                placeholder={capped ? 'Session limit reached' : 'Ask a question…'}
                value={input}
                maxLength={MAX_CHARS}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={pending || capped}
                aria-label="Message input"
              />
              <button
                type="submit"
                className={styles.sendButton}
                aria-label="Send message"
                disabled={pending || capped || !input.trim()}
              >
                <Icon icon="send" />
              </button>
            </form>
            <div className={styles.footer}>
              <Text size="xs" secondary as="span">
                {remaining < 80 ? `${remaining} characters left` : 'Powered by Groq · llama-3.1-8b'}
              </Text>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};
