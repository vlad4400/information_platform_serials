import { nanoid } from 'nanoid';

const createChatMock = (i) => ({
    id: nanoid(10),
    //id: Date.now(),
    name: `Chat ${i + 1}`
});

export const CHATS = Array.from({ length: 10 }).map((_, i) => createChatMock(i));
