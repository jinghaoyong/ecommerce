export interface SideMenuItem {
    id?: number;
    label?: string;
    icon?: string;
    link?: string;
    subItems?: any;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
}

export interface Messages {
    id: string;
    createdAt: any;
    message: string;
    senderId: string;
    senderName: string;
    readStatus: boolean;
}

export interface UserData {
    userId: string;
    userImage: string;
    userName: string;
    password: string; // Added password field
    [key: string]: any;
}

export interface Chatroom {
    id: string;
    participants: Record<string, UserData>;
    readStatus: Record<string, boolean>;
    lastMessage: string;
}

export type Unsubscribe = () => void;

export interface SendMessageParams {
    chatroomId: string;
    message: string;
    senderId: string;
    senderName: string;
    readStatus: boolean;
}

export interface AlertMessage {
    timeRemaining: number | null;
    type: 'inactivity' | 'session' | null
}