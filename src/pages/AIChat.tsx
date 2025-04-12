
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Sparkles, RefreshCw, ChevronDown, Info } from "lucide-react";
import { cn } from '@/lib/utils';

type AIPersona = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  style: string;
};

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const PERSONAS: AIPersona[] = [
  {
    id: 'supportive',
    name: 'Supportive Friend',
    description: 'Gentle, encouraging, and always sees the bright side',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=supportive&backgroundColor=b6e3f4',
    style: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'strict',
    name: 'Strict Coach',
    description: 'Direct, no-nonsense guidance to keep you on track',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=strict&backgroundColor=ffd5dc',
    style: 'bg-red-50 text-red-700 border-red-200'
  },
  {
    id: 'wise',
    name: 'Wise Mentor',
    description: 'Thoughtful, strategic advice with a long-term view',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=wise&backgroundColor=d1d5db',
    style: 'bg-gray-50 text-gray-700 border-gray-200'
  },
  {
    id: 'cheerleader',
    name: 'Enthusiastic Cheerleader',
    description: 'High-energy, exciting motivator to boost your morale',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=cheerleader&backgroundColor=fbcfe8',
    style: 'bg-pink-50 text-pink-700 border-pink-200'
  },
];

// Initial messages for each persona
const INITIAL_MESSAGES: Record<string, Message[]> = {
  supportive: [
    {
      id: '1',
      content: "Hey there! I'm your supportive financial buddy. I noticed you're making great progress on your Gaming PC goal! What would you like to chat about today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ],
  strict: [
    {
      id: '1',
      content: "Alright, let's talk facts. You spent ₹4,500 on dining out this month - that's 30% over budget. What's your plan to get back on track?",
      sender: 'ai',
      timestamp: new Date()
    }
  ],
  wise: [
    {
      id: '1',
      content: "Looking at your financial patterns, I see an opportunity to optimize your savings rate by adjusting your utility expenses. Would you like to discuss strategies for this?",
      sender: 'ai',
      timestamp: new Date()
    }
  ],
  cheerleader: [
    {
      id: '1',
      content: "WOW! You're CRUSHING IT! 🎉 You've saved ₹18,000 this month - that's AMAZING! Let's keep this momentum going! What financial win should we target next?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]
};

// Sample AI responses for demonstration
const SAMPLE_RESPONSES: Record<string, string[]> = {
  supportive: [
    "I understand saving can be challenging. Maybe we could look at small areas where you can save a little extra?",
    "You're doing well with your Gaming PC goal! Already 30% there - that's something to be proud of.",
    "I noticed you've been consistent with tracking expenses. That's a great habit that will really help your financial health!",
    "Looking at your spending, I see you might be able to save a bit more on entertainment. But it's important to enjoy life too - balance is key."
  ],
  strict: [
    "Let's be clear: at your current saving rate, you'll miss your Thailand trip goal by 2 months. You need to increase monthly savings by ₹4,000.",
    "Your dining out expenses are consistently over budget. Cut that by 20% this month - no excuses.",
    "You have three subscriptions you barely use, costing ₹1,200 monthly. Cancel them today and redirect that money to your emergency fund.",
    "Your credit card payment is due in 3 days. Pay it in full - we don't pay interest charges in this household."
  ],
  wise: [
    "Consider this: redirecting just 5% more of your income to savings could reduce your Gaming PC goal timeline by 6 weeks.",
    "I've analyzed your spending patterns over 3 months. Your highest variable expense is food delivery - perhaps meal planning could help optimize this area.",
    "Rather than thinking of budgeting as restriction, view it as strategic allocation. You're deciding what matters most to your future self.",
    "Your financial decisions today compound over time. Even small positive changes can significantly impact your long-term financial health."
  ],
  cheerleader: [
    "YOU'RE AMAZING! 🌟 You've logged expenses for 7 DAYS STRAIGHT! That's what I call DEDICATION!",
    "INCREDIBLE WORK cutting back on shopping this month! That's ₹3,000 MORE for your dream vacation! YOU'RE A SAVINGS SUPERSTAR! 🏆",
    "LOOK AT YOU GO! 🚀 You're already 40% to your emergency fund goal! I'm SO PROUD of your consistency!",
    "WOW! You stayed COMPLETELY under budget this week! That's the kind of WINNING ATTITUDE that makes financial dreams come true! 💪"
  ]
};

const AIChat = () => {
  const [activePersona, setActivePersona] = useState<AIPersona>(PERSONAS[0]);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES[PERSONAS[0].id]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const changePersona = (personaId: string) => {
    const newPersona = PERSONAS.find(p => p.id === personaId)!;
    setActivePersona(newPersona);
    setMessages(INITIAL_MESSAGES[personaId]);
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const responses = SAMPLE_RESPONSES[activePersona.id];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">AI Financial Advisor</h1>
        <p className="text-muted-foreground">Get personalized guidance for your financial journey</p>
      </header>
      
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat with Advisor</TabsTrigger>
          <TabsTrigger value="personas">Change Persona</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src={activePersona.avatar} alt={activePersona.name} />
                <AvatarFallback>{activePersona.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{activePersona.name}</CardTitle>
                <CardDescription>{activePersona.description}</CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="border-t p-4 h-[400px] overflow-y-auto">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={cn(
                        "flex w-max max-w-[80%] rounded-lg p-4",
                        message.sender === 'user' 
                          ? "ml-auto bg-sahay-primary text-white" 
                          : cn("mr-auto", activePersona.style)
                      )}
                    >
                      <p>{message.content}</p>
                    </div>
                  ))}
                  {isLoading && (
                    <div className={cn("flex w-max max-w-[80%] rounded-lg p-4 mr-auto", activePersona.style)}>
                      <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.2s" }} />
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.4s" }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <div className="border-t p-4">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder="Ask about your finances..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || !input.trim()}
                    className="sahay-gradient-bg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-sahay-primary" />
                <CardTitle>Suggested Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {[
                  "How can I increase my savings rate?",
                  "Am I on track for my Thailand trip goal?",
                  "Where am I overspending this month?",
                  "How much should I save for my emergency fund?"
                ].map((question, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    className="justify-start h-auto py-2 px-4 font-normal" 
                    onClick={() => {
                      setInput(question);
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="personas">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your AI Persona</CardTitle>
              <CardDescription>
                Select the personality that best matches your preferred coaching style
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {PERSONAS.map(persona => (
                  <div 
                    key={persona.id}
                    className={cn(
                      "border rounded-lg p-4 cursor-pointer transition-all",
                      activePersona.id === persona.id 
                        ? "ring-2 ring-sahay-primary" 
                        : "hover:border-sahay-primary"
                    )}
                    onClick={() => changePersona(persona.id)}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={persona.avatar} alt={persona.name} />
                        <AvatarFallback>{persona.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{persona.name}</h3>
                        <p className="text-sm text-muted-foreground">{persona.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIChat;
