import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { environment } from '../../../../environments/environment';
// Initialize Firebase
const app = initializeApp(environment.firebaseProject_);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class PagetitleService {

  constructor() { }

  // async getPageTitle(pageId: string): Promise<string | null> {
  //   try {
  //     const pagetitleRef = collection(db, `toptitle`);
  //     const q = query(messagesRef, orderBy('createdAt', 'asc'));

  //     onSnapshot(q, (querySnapshot) => {
  //       const messages: Messages[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Messages);
  //       const unreadCount = this.countUnreadMessages(messages, participantId);
  //       callback(unreadCount);
  //     });

  //   } catch (error: any) {
  //     console.error('Error getting page title:', error.message);
  //     throw error;
  //   }
  // }

}
