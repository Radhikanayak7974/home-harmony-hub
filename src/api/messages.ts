import { createServerFn } from "@tanstack/react-start";
import { chats, Chat } from "@/lib/data";

const chatDatabase: Chat[] = JSON.parse(JSON.stringify(chats));

export interface SendMessagePayload {
  chatId: string;
  text: string;
}

/**
 * Backend API Server Function: Get Active Chat Threads
 */
export const getConversationsFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<Chat[]> => {
    return chatDatabase;
  }
);

/**
 * Backend API Server Function: Send Message with Auto-Reply
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

    const timeStr = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = {
      id: `m-${Date.now()}`,
      from: "me" as const,
      text: data.text,
      time: timeStr,
      read: true,
    };

    chat.messages.push(userMsg);
    chat.unread = 0;

    // Simulated Auto-Reply from Landlord / Service Pro
    let replyText = "Thank you for reaching out! I will check the schedule and get back to you shortly.";
    if (chat.name.includes("Ananya")) {
      replyText = "Sounds good! I've noted down your request. Let me confirm the keys with the security desk.";
    } else if (chat.name.includes("Suresh")) {
      replyText = "Got it! I will bring the standard electrical testing kit and spare MCB switches.";
    } else if (chat.name.includes("Lakshmi")) {
      replyText = "Our deep cleaning crew will arrive on time with non-toxic Eco Clean products.";
    }

    const replyMsg = {
      id: `m-${Date.now() + 1}`,
      from: "them" as const,
      text: replyText,
      time: timeStr,
      read: true,
    };

    chat.messages.push(replyMsg);
    return { userMsg, replyMsg };
  });
