import { nanoid } from 'nanoid';

export const compareById = (targetID) => (item) => item.id === targetID;

export const createMessage = (author, text, className) => ({
    author,
    text,
    className,
});

export const mapMessageSnapshotToMessage = (snapshot) => ({
    ...snapshot.val(),
    id: snapshot.key,
});


export const createChat = (name) => ({
    name,
});

export const mapChatSnapshotToChat = (snapshot) => ({
    ...snapshot.val(),
    id: snapshot.key,
});
