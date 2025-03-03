import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, limit, orderBy, query, where } from 'firebase/firestore';
import { environment } from '../../../../environments/environment';

// Initialize Firebase
const app = initializeApp(environment.firebaseProject_);
const db = getFirestore(app);


@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }

  async getTopHashtags() {
    const hashtagsRef = collection(db, 'hashtags');
    const q = query(hashtagsRef, orderBy('searched', 'desc'), limit(8));

    const querySnapshot = await getDocs(q);
    const hashtags = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log(hashtags);
    return hashtags;
  }
}
