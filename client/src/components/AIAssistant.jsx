import { useEffect, useRef, useState } from 'react';
import { FiActivity, FiMessageSquare, FiSend, FiX } from 'react-icons/fi';
import API from '../utils/api';
import CalorieCalculator from './CalorieCalculator';

const starterMessages = [
  {
    id: 'welcome',
    role: 'assistant',
    content: 'Hi! I can help with plans, programs, sessions, or quick calorie guidance. What would you like to know?',
  },
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ai');
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    const nextMessages = [...messages, { id: `user-${Date.now()}`, role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setSending(true);

    try {
      const response = await API.post('/ai/chat', {
        messages: nextMessages.map(({ role, content }) => ({ role, content })),
      });

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.data?.message || 'I can help with programs, plans, and registration.',
        },
      ]);
    } catch (error) {
      console.error('AI assistant error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          content: 'The assistant is taking longer than expected. Please try again or use the contact page for a direct response.',
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {open ? <div className="ai-panel-overlay" onClick={() => setOpen(false)}></div> : null}

      <button
        type="button"
        className="ai-float-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close tools panel' : 'Open AI and calculator tools'}
      >
        {open ? <FiX size={22} /> : <FiMessageSquare size={22} />}
      </button>

      <aside className={`ai-side-panel ${open ? '' : 'closed'}`}>
        <div className="ai-side-header">
          <div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-gray-900)' }}>Quick Tools</h3>
            <p style={{ color: 'var(--color-gray-600)', marginTop: '6px', fontSize: '0.9rem' }}>
              Get instant guidance or calculate daily calorie targets.
            </p>
          </div>

          <div className="ai-side-tabs">
            <button
              type="button"
              className={`ai-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <FiMessageSquare /> AI
            </button>
            <button
              type="button"
              className={`ai-tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
              onClick={() => setActiveTab('calculator')}
            >
              <FiActivity /> Calculator
            </button>
          </div>
        </div>

        <div className="ai-side-body">
          {activeTab === 'ai' ? (
            <div className="ai-chat-container">
              <div className="ai-messages-list">
                {messages.map((message) => (
                  <div key={message.id} className={`ai-message ${message.role === 'user' ? 'ai-message-user' : 'ai-message-bot'}`}>
                    <div className={`ai-bubble ${message.role === 'user' ? 'ai-bubble-user' : 'ai-bubble-bot'}`}>
                      {message.content}
                    </div>
                  </div>
                ))}
                {sending ? (
                  <div className="ai-message ai-message-bot">
                    <div className="ai-bubble ai-bubble-bot">
                      <div className="ai-typing">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div ref={messagesEndRef}></div>
              </div>

              <form className="ai-panel-input" onSubmit={handleSend}>
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about plans, sessions, yoga, fitness..."
                />
                <button type="submit" disabled={sending || !input.trim()} aria-label="Send message">
                  <FiSend size={16} />
                </button>
              </form>
            </div>
          ) : (
            <div className="ai-calculator-container">
              <CalorieCalculator onClose={() => setOpen(false)} />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
