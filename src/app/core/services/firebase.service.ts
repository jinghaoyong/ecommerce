import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getDocs, getFirestore, doc, setDoc, getDoc, query, where, orderBy, Timestamp, onSnapshot, updateDoc, DocumentData, QuerySnapshot, QueryDocumentSnapshot, Unsubscribe } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from '../../../environments/environment.development';
import { Chatroom, Messages, UserData } from '../interfaces/@type';
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor() {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser: User | null = currentUserString ? JSON.parse(currentUserString) : null;

    this.currentUserSubject = new BehaviorSubject<any>(currentUser);

    // Subscribe to changes and update localStorage
    this.currentUserSubject.subscribe(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
    });

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserData {
    return this.currentUserSubject.value;
  }

  async getUserData(userIds: string[]): Promise<Record<string, UserData>> {
    const userData: Record<string, UserData> = {};

    for (const userId of userIds) {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        userData[userId] = userDoc.data() as UserData;
      }
    }

    return userData;
  }

  async createUserData(userData: UserData): Promise<void> {
    try {
      const userRef = await addDoc(collection(db, 'users'), {
        ...userData,
        createdAt: Timestamp.now()
      });
      await setDoc(userRef, { userId: userRef.id }, { merge: true });
      console.log('User data created successfully');
    } catch (error: any) {
      console.error('Error creating user data:', error.message);
      throw error;
    }
  }

  async googleLoginUser(): Promise<UserData | null> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          const userData: UserData = {
            userId: user.uid,
            userImage: user.photoURL || '',
            userName: user.displayName || '',
            email: user.email || '',
            password: '',
            createdAt: Timestamp.now()
          };
          localStorage.setItem('currentUser', JSON.stringify(userData));
          this.currentUserSubject.next(userData);

          await this.createUserData(userData);
          return userData;
        } else {
          const existingUserData = querySnapshot.docs[0].data() as UserData;
          localStorage.setItem('currentUser', JSON.stringify(existingUserData));
          this.currentUserSubject.next(existingUserData);
          return existingUserData;
        }
      }

      return null;
    } catch (error: any) {
      console.error('Error during Google login:', error.message);
      throw error;
    }
  }

  async loginUser(userName: string, password: string): Promise<UserData | null> {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('userName', '==', userName));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error('User not found');
        return null;
      }

      let userData: UserData | null = null;
      querySnapshot.forEach((doc) => {
        const data = doc.data() as UserData;
        if (data.password === password) {
          userData = data;
        }
      });

      if (userData) {
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.currentUserSubject.next(userData);
        console.log('User logged in successfully');
        return userData;
      } else {
        console.error('Incorrect password');
        return null;
      }
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      throw error;
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  async sendMessage(chatroomId: string, message: string, senderId: string, senderName: string, readStatus: boolean): Promise<void> {
    const messagesRef = collection(db, `chatrooms/${chatroomId}/messages`);
    const createdAt = Timestamp.now();

    await addDoc(messagesRef, {
      createdAt,
      message,
      senderId,
      senderName,
      readStatus
    });
  }

  async getMessagesBasedOnChatroomId(chatroomId: string, callback: (messages: Messages[]) => void): Promise<Unsubscribe> {
    const messagesRef = collection(db, `chatrooms/${chatroomId}/messages`);
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const messages: Messages[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({ id: doc.id, ...doc.data() } as Messages));
      callback(messages);
    }, (error) => {
      console.error("Error fetching messages: ", error);
      callback([]);
    });

    return unsubscribe;
  }

  async createOrGetChatroom(participant1Id: string, participant2Id: string): Promise<string> {
    const participants = [participant1Id, participant2Id].sort();

    const chatroomQuery = query(
      collection(db, 'chatrooms'),
      where(`participants.${participant1Id}.userId`, '==', participant1Id),
      where(`participants.${participant2Id}.userId`, '==', participant2Id)
    );
    const querySnapshot = await getDocs(chatroomQuery);

    if (!querySnapshot.empty) {
      const existingChatroom = querySnapshot.docs.find((doc: QueryDocumentSnapshot<any>) => {
        const participants = doc.data().participants;
        return participants[participant1Id] && participants[participant2Id];
      });

      if (existingChatroom) {
        return existingChatroom.id;
      }
    }

    const userData = await this.getUserData(participants);

    const chatroomRef = await addDoc(collection(db, 'chatrooms'), {
      participants: {
        [participant1Id]: {
          userId: participant1Id,
          userImage: userData[participant1Id]?.userImage || '',
          userName: userData[participant1Id]?.userName || '',
        },
        [participant2Id]: {
          userId: participant2Id,
          userImage: userData[participant2Id]?.userImage || '',
          userName: userData[participant2Id]?.userName || '',
        }
      },
      readStatus: {
        [participant1Id]: false,
        [participant2Id]: false
      },
      lastMessage: '',
    });

    return chatroomRef.id;
  }

  getUnreadMessageCount(participantId: string, chatroomId: string, callback: (unreadCount: number) => void): void {
    const messagesRef = collection(db, `chatrooms/${chatroomId}/messages`);
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, (querySnapshot) => {
      const messages: Messages[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Messages);
      const unreadCount = this.countUnreadMessages(messages, participantId);
      callback(unreadCount);
    });
  }

  markAllMessagesAsRead(participantId: string, chatroomId: string): void {
    const messagesRef = collection(db, `chatrooms/${chatroomId}/messages`);
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    getDocs(q).then(querySnapshot => {
      querySnapshot.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
        const message: Messages = docSnapshot.data() as Messages;
        if (message.senderId !== participantId && !message.readStatus) {
          updateDoc(docSnapshot.ref, { readStatus: true });
        }
      });
    });
  }

  private countUnreadMessages(messages: Messages[], participantId: string): number {
    return messages.filter((message: Messages) => message.senderId !== participantId && !message.readStatus).length;
  }
}
