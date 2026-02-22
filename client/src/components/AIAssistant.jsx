import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiUser, FiActivity } from 'react-icons/fi';
import { useUser, useClerk } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import API from '../utils/api';
import CalorieCalculator from './CalorieCalculator';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ai'); // 'ai' or 'calculator'
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadId, setLeadId] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef(null);

  const { user, isSignedIn } = useUser();
  const clerk = useClerk();

  const userName = user?.fullName || user?.firstName || 'User';
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  // Initialize chat when opened and user is logged in
  const initializeChat = async () => {
    if (initialized) return;
    
    setInitialized(true);
    setMessages([
      {
        role: 'assistant',
        content: `Welcome, ${userName.split(' ')[0]}! 👋\n\nI'm your OneHour Challenge fitness assistant. I can help you with:\n\n• **Programs** — Fitness, Zumba, Yoga\n• **Plans & Pricing** — PRO & ADVANCE memberships\n• **Fitness guidance** — Workouts, nutrition, tips\n• **Booking help** — How to get started\n\nHow can I help you today?`,
      },
    ]);

    // Send lead to backend
    try {
      const res = await API.post('/ai/lead', {
        name: userName,
        email: userEmail,
        mobile: 'Via Chatbot',
      });
      setLeadId(res.data.leadId);
    } catch {
      // Non-critical
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      if (!isSignedIn) {
        toast('Please login first to use our AI and Calculator', { icon: '🔒' });
        if (clerk?.openSignIn) {
          clerk.openSignIn({ forceRedirectUrl: window.location.pathname });
        }
        return;
      }
      setIsOpen(true);
      initializeChat();
      document.body.style.overflow = 'hidden'; // Prevent scrolling when panel is open
    } else {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');

    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const contextMessages = newMessages
        .slice(-10)
        .map(m => ({ role: m.role, content: m.content }));

      const res = await API.post('/ai/chat', {
        messages: contextMessages,
        leadId,
      });

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: res.data.message },
      ]);
    } catch (err) {
      console.error('AI Chat Frontend Error:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `I'm having trouble connecting to my brain right now! Please reach out to us directly:\n\n📧 **Email:** manoharbasappagari18@gmail.com\n📞 **Phone:** 9515022680\n\nOur team will be happy to assist you!`,
        },
      ]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
      .replace(/• /g, '&bull; ');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="ai-float-btn"
        onClick={handleToggle}
        aria-label="AI Assistant"
        id="ai-assistant-toggle"
      >
        {isOpen ? <FiX size={22} /> : <FiMessageCircle size={22} />}
      </button>

      {/* Side Panel Overlay */}
      {isOpen && <div className="ai-panel-overlay" onClick={handleToggle} />}

      {/* Side Panel */}
      <div className={`ai-side-panel ${!isOpen ? 'closed' : ''}`}>
        {/* Header */}
        <div className="ai-side-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: 800,
                color: '#fff'
              }}>
                OC
              </div>
              <div>
                <h3 style={{ color: 'var(--color-gray-900)', fontSize: '1rem', fontWeight: 700 }}>OneHour Challenge</h3>
                <p style={{ color: 'var(--color-primary)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)' }} />
                  Active Assistant
                </p>
              </div>
            </div>
            <button onClick={handleToggle} style={{ background: 'transparent', color: 'var(--color-gray-500)' }}>
              <FiX size={22} />
            </button>
          </div>

          <div className="ai-side-tabs">
            <button 
              className={`ai-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <FiMessageCircle size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              AI Assistant
            </button>
            <button 
              className={`ai-tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
              onClick={() => setActiveTab('calculator')}
            >
              <FiActivity size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Calorie Calculator
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="ai-side-body">
          {activeTab === 'ai' ? (
            <div className="ai-chat-container">
              <div className="ai-messages-list">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`ai-message ${msg.role === 'user' ? 'ai-message-user' : 'ai-message-bot'}`}
                    style={{ marginBottom: '20px' }}
                  >
                    <div
                      className={`ai-bubble ${msg.role === 'user' ? 'ai-bubble-user' : 'ai-bubble-bot'}`}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                  </div>
                ))}
                {loading && (
                  <div className="ai-message ai-message-bot">
                    <div className="ai-bubble ai-bubble-bot">
                      <div className="ai-typing">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="ai-panel-input">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask anything..."
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="btn btn-primary btn-sm"
                >
                  <FiSend size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="ai-calculator-container">
              <CalorieCalculator onClose={handleToggle} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
