// ================================
// NIRA CHAT STORE (LOCAL STORAGE)
// ================================

const STORAGE_KEY = "nira_chats";
const ACTIVE_KEY = "active_chat_id";

// ================================
// TYPES (optional but useful)
// ================================
export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
};

// ================================
// BASIC HELPERS
// ================================

export const getChats = (): Chat[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveChats = (chats: Chat[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
};

export const getActiveChatId = (): string | null => {
  return localStorage.getItem(ACTIVE_KEY);
};

export const setActiveChatId = (id: string) => {
  localStorage.setItem(ACTIVE_KEY, id);
};

// ================================
// CREATE NEW CHAT
// ================================

export const createNewChat = (): Chat => {
  const chats = getChats();

  const newChat: Chat = {
    id: Date.now().toString(),
    title: "New Chat",
    messages: [],
    createdAt: Date.now(),
  };

  const updatedChats = [newChat, ...chats];

  saveChats(updatedChats);
  setActiveChatId(newChat.id);

  return newChat;
};

// ================================
// GET CHAT BY ID
// ================================

export const getChatById = (id: string): Chat | undefined => {
  const chats = getChats();
  return chats.find((chat) => chat.id === id);
};

// ================================
// UPDATE CHAT MESSAGES
// ================================

export const updateChatMessages = (
  id: string,
  messages: ChatMessage[]
) => {
  const chats = getChats();

  const updatedChats = chats.map((chat) =>
    chat.id === id ? { ...chat, messages } : chat
  );

  saveChats(updatedChats);
};

// ================================
// UPDATE CHAT TITLE (SMART)
// ================================

export const updateChatTitle = (id: string, firstMessage: string) => {
  const chats = getChats();

  const updatedChats = chats.map((chat) => {
    if (chat.id === id && chat.title === "New Chat") {
      return {
        ...chat,
        title: generateTitle(firstMessage),
      };
    }
    return chat;
  });

  saveChats(updatedChats);
};

// ================================
// DELETE CHAT (future use)
// ================================

export const deleteChat = (id: string) => {
  const chats = getChats();

  const updatedChats = chats.filter((chat) => chat.id !== id);

  saveChats(updatedChats);

  // agar deleted chat active tha → reset
  const activeId = getActiveChatId();
  if (activeId === id) {
    if (updatedChats.length > 0) {
      setActiveChatId(updatedChats[0].id);
    } else {
      localStorage.removeItem(ACTIVE_KEY);
    }
  }
};

// ================================
// GENERATE TITLE (SMART)
// ================================

const generateTitle = (text: string): string => {
  if (!text) return "New Chat";

  return text
    .replace(/\n/g, " ")
    .slice(0, 30)
    .trim() + (text.length > 30 ? "..." : "");
};