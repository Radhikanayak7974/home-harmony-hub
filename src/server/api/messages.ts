import { createServerFn } from "@tanstack/react-start";
import { chats, Chat } from "@/lib/data";

const chatDatabase: Chat[] = [...chats];

export interface SendMessagePayload {
  chatId: string;
  text: string;
}

/**
 * Backend API Server Function: Get All Active Chat Threads
 */
export const getConversationsFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<Chat[]> => {
    return chatDatabase;
  }
);

/**
 * Backend API Server Function: Send Message in Chat Thread
 */
export const sendMessageFn = createServerFn({ method: "POST" })
  .validator((data: SendMessagePayload) => {
    if (!data.text || data.text.trim() === "") {
      throw new Error("Message text cannot be empty");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const chat = chatDatabase.find((c) => c.id === data.chatId);
    if (!chat) {
      throw new Error("Chat thread not found");
    }

    const newMsg = {
      id: `m-${Date.now()}`,
      from: "me" as const,
      text: data.text,
      time: "Just now",
      read: true,
    };

    chat.messages.push(newMsg);
    return newMsg;
  });
