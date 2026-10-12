import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ChatModal() {
  const { chatProduct, setChatProduct } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'seller',
      text: 'Hi there! Thanks for your interest. How can I help you today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!chatProduct) return null;

  const quickReplies = [
    'Is this still available?',
    'What is your final price?',
    'Can I inspect it today?',
    'Do you have the original bill & box?'
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate seller response
    setTimeout(() => {
      let replyText = 'Yes, it is in excellent condition and ready for handover!';
      if (text.toLowerCase().includes('available')) {
        replyText = 'Yes, it is still available! A few people have asked, but no deal finalized yet.';
      } else if (text.toLowerCase().includes('price') || text.toLowerCase().includes('final')) {
        replyText = `I can offer a slight discount of around ₹${Math.round(chatProduct.price * 0.05).toLocaleString('en-IN')} if we can close the deal quickly.`;
      } else if (text.toLowerCase().includes('inspect') || text.toLowerCase().includes('meet')) {
        replyText = `Sure! You can come inspect it in ${chatProduct.location}. Let me know what time works best for you.`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'seller',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(3px)', zIndex: 1070 }}
      onClick={() => setChatProduct(null)}
    >
      <div 
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: '520px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg d-flex flex-column" style={{ height: '560px' }}>
          
          {/* Header */}
          <div className="modal-header bg-white border-bottom py-2 px-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div 
                className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold"
                style={{ width: '36px', height: '36px', fontSize: '14px' }}
              >
                {chatProduct.seller?.name ? chatProduct.seller.name.charAt(0) : 'S'}
              </div>
              <div>
                <div className="fw-bold small">{chatProduct.seller?.name || 'Seller'}</div>
                <div className="text-success small" style={{ fontSize: '11px' }}>
                  <i className="bi bi-circle-fill me-1" style={{ fontSize: '8px' }}></i> Online
                </div>
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setChatProduct(null)}
              aria-label="Close"
            ></button>
          </div>

          {/* Product Banner snippet */}
          <div className="bg-light p-2 border-bottom d-flex align-items-center gap-2">
            <img 
              src={chatProduct.images[0]} 
              alt="prod" 
              className="rounded" 
              style={{ width: '48px', height: '48px', objectFit: 'cover' }}
            />
            <div className="text-truncate flex-grow-1">
              <div className="small fw-semibold text-truncate">{chatProduct.title}</div>
              <div className="fw-bold text-dark small">
                ₹{chatProduct.price.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="modal-body p-3 overflow-y-auto flex-grow-1 d-flex flex-column gap-2 bg-white">
            {messages.map(msg => (
              <div 
                key={msg.id}
                className={`d-flex flex-column ${msg.sender === 'user' ? 'align-items-end' : 'align-items-start'}`}
              >
                <div 
                  className={`p-2 px-3 rounded-3 small shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-light text-dark border'
                  }`}
                  style={{ maxWidth: '80%', lineHeight: '1.4' }}
                >
                  {msg.text}
                </div>
                <span className="text-muted mt-1" style={{ fontSize: '10px' }}>
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="align-self-start text-muted small fst-italic">
                <i className="bi bi-three-dots"></i> Seller is typing...
              </div>
            )}
          </div>

          {/* Quick reply chips */}
          <div className="px-3 py-1 bg-light border-top d-flex gap-1 overflow-x-auto scrollbar-hidden">
            {quickReplies.map((q, i) => (
              <button
                key={i}
                type="button"
                className="btn btn-outline-secondary btn-sm text-nowrap rounded-pill py-0 px-2"
                style={{ fontSize: '11px' }}
                onClick={() => handleSend(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="modal-footer p-2 bg-light border-top">
            <form 
              className="d-flex w-100 gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                placeholder="Type your message..."
                className="form-control form-control-sm"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm px-3 fw-bold">
                <i className="bi bi-send-fill"></i>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
