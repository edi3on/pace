import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, PhoneOff, Mic, MicOff, Volume2, AlertCircle } from 'lucide-react';

const ConversationPage = ({ onBack }) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);
  const [serviceAvailable, setServiceAvailable] = useState(false);
  const [elevenLabsService, setElevenLabsService] = useState(null);
  const messagesEndRef = useRef(null);
  const durationInterval = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Start duration timer when connected
  useEffect(() => {
    if (isConnected) {
      durationInterval.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }
    }

    return () => {
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }
    };
  }, [isConnected]);

  // Format duration as MM:SS
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Split text into sentences with proper spacing
  const formatMessageText = (text) => {
    if (!text) return '';
    
    // Split by sentence endings and filter out empty strings
    const sentences = text.split(/([.!?]+)/).filter(part => part.trim().length > 0);
    
    // Combine sentence parts and add line breaks
    const formattedSentences = [];
    for (let i = 0; i < sentences.length; i += 2) {
      const sentence = sentences[i] + (sentences[i + 1] || '');
      if (sentence.trim()) {
        formattedSentences.push(sentence.trim());
      }
    }
    
    return formattedSentences;
  };

  // Initialize ElevenLabs service callbacks
  useEffect(() => {
    const initializeService = async () => {
      try {
        console.log('Loading ElevenLabs service...');
        const serviceModule = await import('../services/elevenLabsService');
        const service = serviceModule.default;
        console.log('ElevenLabs service loaded:', service);
        
        setElevenLabsService(service);
        setServiceAvailable(true);
        console.log('Service available set to true');

        service.setCallbacks({
          onMessage: (message) => {
            console.log('Received message:', message);
            const newMessage = {
              id: Date.now(),
              speaker: message.source === 'user' ? 'user' : 'agent',
              text: message.message || message.text || message.content || '',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, newMessage]);
          },
          onStatusChange: (status) => {
            console.log('Status change:', status);
            setIsConnecting(status === 'connecting');
            setIsConnected(status === 'connected');
            if (status === 'disconnected') {
              setDuration(0);
              if (durationInterval.current) {
                clearInterval(durationInterval.current);
                durationInterval.current = null;
              }
            } else if (status === 'connected') {
              // Start duration timer when connected
              durationInterval.current = setInterval(() => {
                setDuration(prev => prev + 1);
              }, 1000);
            }
          },
          onError: (error) => {
            console.error('ElevenLabs error:', error);
            setError(error.message || 'Connection error occurred');
            setIsConnecting(false);
            setIsConnected(false);
          }
        });

        // Don't auto-start conversation, let user click the button
        console.log('Service initialized, ready for manual start');

      } catch (error) {
        console.error('Failed to load ElevenLabs service:', error);
        setError('Failed to load voice service. Please refresh the page and try again.');
        setServiceAvailable(false);
      }
    };

    initializeService();

    return () => {
      // Cleanup on unmount
      if (elevenLabsService) {
        elevenLabsService.endConversation();
      }
    };
  }, []);

  const startConversation = async (service = elevenLabsService) => {
    console.log('startConversation called with:', { service: !!service });
    
    if (!service) {
      console.error('Service not available:', { service: !!service });
      setError('Voice service not available. Please refresh the page and try again.');
      return;
    }

    setError(null);
    setIsConnecting(true);
    
    try {
      console.log('Attempting to start conversation...');
      const success = await service.startConversation();
      console.log('startConversation result:', success);
      
      if (!success) {
        setError('Failed to start conversation. Please check your microphone permissions.');
        setIsConnecting(false);
      }
    } catch (err) {
      console.error('Error starting conversation:', err);
      setError('Failed to start conversation: ' + err.message);
      setIsConnecting(false);
    }
  };

  const endConversation = async () => {
    if (elevenLabsService) {
      await elevenLabsService.endConversation();
      setIsConnected(false);
      setIsConnecting(false);
      setDuration(0);
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
        durationInterval.current = null;
      }
    }
  };
  const toggleMute = async () => {
    if (elevenLabsService && elevenLabsService.isConversationActive()) {
      const newMuteState = await elevenLabsService.toggleMute();
      setIsMuted(newMuteState);
    } else {
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AI Coach Conversation</h1>
                  <p className="text-xs text-gray-600">Live session with Coach Alex</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isConnected && (
                <Badge className="bg-green-600 text-white">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  Connected • {formatDuration(duration)}
                </Badge>
              )}
              
              {isConnecting && (
                <Badge className="bg-yellow-600 text-white">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  Connecting...
                </Badge>
              )}
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleMute}
                  className={isMuted ? 'bg-red-50 border-red-200' : ''}
                >
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={endConversation}
                  disabled={!isConnected && !isConnecting}
                >
                  <PhoneOff className="h-4 w-4 mr-1" />
                  End Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center justify-between">
              <span>Live Transcript</span>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Volume2 className="h-4 w-4" />
                <span>Real-time conversation</span>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden flex flex-col">
            {!serviceAvailable && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2 text-yellow-800">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Voice Service Loading...</p>
                    <p className="text-sm">Please wait while we initialize the AI voice service.</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {error}
              </div>
            )}
            
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.length === 0 && !isConnecting && !isConnected && (
                <div className="text-center text-gray-500 py-8">
                  <Phone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="mb-4">Ready to start your conversation with Coach Alex</p>
                  <button
                    onClick={() => startConversation()}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    🎙️ Start Voice Conversation
                  </button>
                </div>
              )}
              
              {isConnecting && messages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p>Connecting to Coach Alex...</p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.speaker === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium">
                        {message.speaker === 'user' ? 'You' : 'Coach Alex'}
                      </span>
                      <span className="text-xs opacity-70">{message.timestamp}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {formatMessageText(message.text).map((sentence, index) => (
                        <div key={index} className="leading-relaxed">
                          {sentence}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Connection Status */}
            {isConnected && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm text-center">
                🎙️ Voice conversation active - speak naturally with Coach Alex
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ConversationPage;

