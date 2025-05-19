import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { environment } from '../../../../environments/environment';


// Initialize Firebase
const app = initializeApp(environment.firebaseProject_);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class SpecialContentService {

  constructor() { }

  async getSpecialContent(): Promise<any[]> {
    try {
      const specialContentSnapshot = await getDocs(collection(db, 'specialContent'));

      const specialContent: any[] = specialContentSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((item: any) => item.enable === true); // filter here

      return specialContent;
    } catch (error) {
      console.error('Error retrieving specialContent:', error);
      return [];
    }
  }


}
