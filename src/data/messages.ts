import { IMessage } from "../models/message";

export const MESSAGES = [
  {
    id: "1",
    text: "Hi, how are you?",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:00:00Z",
  },
  {
    id: "2",
    text: "Hey there!",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:01:00Z",
  },
  {
    id: "3",
    text: "What are you up to?",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:02:00Z",
  },
  {
    id: "4",
    text: "Just working on a project.",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:03:00Z",
  },
  {
    id: "5",
    text: "Sounds interesting!",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:04:00Z",
  },
  {
    id: "6",
    text: "Yeah, its challenging but fun.",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:05:00Z",
  },
  {
    id: "7",
    text: "Do you need any help?",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:06:00Z",
  },
  {
    id: "8",
    text: "Not at the moment, thanks!",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:07:00Z",
  },
  {
    id: "9",
    text: "Alright, let me know if you do.",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:08:00Z",
  },
  {
    id: "10",
    text: "Sure, I will.",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:09:00Z",
  },
  {
    id: "11",
    text: "Hello!",
    senderId: "3",
    recipientId: "0",
    timestamp: "2022-01-01T00:10:00Z",
  },
  {
    id: "12",
    text: "Hi there!",
    senderId: "0",
    recipientId: "3",
    timestamp: "2022-01-01T00:11:00Z",
  },
  {
    id: "13",
    text: "Good morning!",
    senderId: "4",
    recipientId: "0",
    timestamp: "2022-01-01T00:12:00Z",
  },
  {
    id: "14",
    text: "Morning!",
    senderId: "0",
    recipientId: "4",
    timestamp: "2022-01-01T00:13:00Z",
  },
  {
    id: "15",
    text: "How was your day?",
    senderId: "5",
    recipientId: "0",
    timestamp: "2022-01-01T00:14:00Z",
  },
  {
    id: "16",
    text: "It was good, thanks!",
    senderId: "0",
    recipientId: "5",
    timestamp: "2022-01-01T00:15:00Z",
  },
  {
    id: "17",
    text: "What are your plans for the weekend?",
    senderId: "6",
    recipientId: "0",
    timestamp: "2022-01-01T00:16:00Z",
  },
  {
    id: "18",
    text: "Im going hiking.",
    senderId: "0",
    recipientId: "6",
    timestamp: "2022-01-01T00:17:00Z",
  },
  {
    id: "19",
    text: "Have a great time!",
    senderId: "7",
    recipientId: "0",
    timestamp: "2022-01-01T00:18:00Z",
  },
  {
    id: "20",
    text: "Thank you!",
    senderId: "0",
    recipientId: "7",
    timestamp: "2022-01-01T00:19:00Z",
  },
  {
    id: "21",
    text: "Did you watch the latest movie?",
    senderId: "8",
    recipientId: "0",
    timestamp: "2022-01-01T00:20:00Z",
  },
  {
    id: "22",
    text: "Yes, it was amazing!",
    senderId: "0",
    recipientId: "8",
    timestamp: "2022-01-01T00:21:00Z",
  },
  {
    id: "23",
    text: "This is a new message.",
    senderId: "1",
    recipientId: "0",
    timestamp: "2022-01-01T00:22:00Z",
  },
  {
    id: "24",
    text: "Another message.",
    senderId: "1",
    recipientId: "0",
    timestamp: "2022-01-01T00:23:00Z",
  },
  {
    id: "25",
    text: "Just checking in.",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:24:00Z",
  },
  {
    id: "26",
    text: "I have a question for you.",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:25:00Z",
  },
  {
    id: "27",
    text: "What do you think about this idea?",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:26:00Z",
  },
  {
    id: "28",
    text: "I need your help with something.",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:27:00Z",
  },
  {
    id: "29",
    text: "Can we meet tomorrow?",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:28:00Z",
  },
  {
    id: "30",
    text: "I have an update on the project.",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:29:00Z",
  },
  {
    id: "31",
    text: "Let me know when youre available.",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:30:00Z",
  },
  {
    id: "32",
    text: "I found a bug in the code.",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:31:00Z",
  },
  {
    id: "33",
    text: "Do you have any suggestions?",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:32:00Z",
  },
  {
    id: "34",
    text: "Im excited about the new feature.",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:33:00Z",
  },
  {
    id: "35",
    text: "Lets discuss it in the meeting.",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:34:00Z",
  },
  {
    id: "36",
    text: "I have some feedback for you.",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:35:00Z",
  },
  {
    id: "37",
    text: "Can you review my code?",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:36:00Z",
  },
  {
    id: "38",
    text: "Im looking forward to the demo.",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:37:00Z",
  },
  {
    id: "39",
    text: "Lets grab lunch together.",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:38:00Z",
  },
  {
    id: "40",
    text: "I have some exciting news to share.",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:39:00Z",
  },
  {
    id: "41",
    text: "Can you help me with this bug?",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:40:00Z",
  },
  {
    id: "42",
    text: "Im working on a new feature.",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:41:00Z",
  },
  {
    id: "43",
    text: "Lets schedule a meeting.",
    senderId: "2",
    recipientId: "0",
    timestamp: "2022-01-01T00:42:00Z",
  },
  {
    id: "44",
    text: "I have some ideas to discuss.",
    senderId: "0",
    recipientId: "2",
    timestamp: "2022-01-01T00:43:00Z",
  },
];

export const fetchMessages = (
  userId: string,
  recipientId: string,
  page: number,
  pageSize: number
): Promise<IMessage[]> => {
  const messages = MESSAGES.filter(
    (message) =>
      (message.senderId === userId && message.recipientId === recipientId) ||
      (message.senderId === recipientId && message.recipientId === userId)
  ).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const totalMessages = messages.length;
  const startIndex = totalMessages - page * pageSize; // Start from the end
  const endIndex = startIndex + pageSize;

  return Promise.resolve(messages.slice(startIndex, endIndex));
};

export const sendMessage = (senderId: string, recipientId: string, text: string): IMessage => {
    // Suppose it is send to the server, and it returns us the object are returning 
    return {
        id: Date.now().toString(), //suppose it is unique
        recipientId: recipientId,
        senderId: senderId,
        text: text,
        timestamp: new Date().toISOString(),
    } 
}
