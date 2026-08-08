import type { Message, User, Room } from "../types";

export const mockUsers: User[] = [
    { id: '1', username: 'Pratik' },
    { id: '2', username: 'Nidhi' },
    { id: '3', username: 'Rahul' },
    { id: '4', username: 'Priya' },
    { id: '5', username: 'Arjun' },
];

export const mockRooms: Room[] = [
    { id: '1', name: 'general' },
    { id: '2', name: 'design-team' },
    { id: '3', name: 'project-delta' },
    { id: '4', name: 'coffee-talk' },
];

export const mockMessages: Message[] = [
    {
        id: '1',
        content: 'Hey everyone, good morning!',
        sender: 'Rahul',
        timestamp: new Date('2026-08-06T08:00:00').toISOString(),
    },
    {
        id: '2',
        content: 'Good morning! Ready for the standup?',
        sender: 'Pratik',
        timestamp: new Date('2026-08-06T08:01:00').toISOString(),
    },
    {
        id: '3',
        content: 'Yes, just finishing my chai first.',
        sender: 'Nidhi',
        timestamp: new Date('2026-08-06T08:02:00').toISOString(),
    },
    {
        id: '4',
        content: 'Has anyone reviewed the PR I raised yesterday?',
        sender: 'Priya',
        timestamp: new Date('2026-08-06T08:03:00').toISOString(),
    },
    {
        id: '5',
        content: 'Yes, left some comments. Looks good overall.',
        sender: 'Pratik',
        timestamp: new Date('2026-08-06T08:04:00').toISOString(),
    },
    {
        id: '6',
        content: 'Thanks! Will address them this morning.',
        sender: 'Priya',
        timestamp: new Date('2026-08-06T08:05:00').toISOString(),
    },
];