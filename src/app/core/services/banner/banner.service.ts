import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { environment } from '../../../../environments/environment';

// Initialize Firebase
const app = initializeApp(environment.firebaseProject_);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})

export class BannerService {

  constructor() { }

  async getBanner(): Promise<any[]> {
    const bannersSnapshot = await getDocs(collection(db, 'banner'));
    const banners: any[] = [];
    bannersSnapshot.forEach((doc) => {
      banners.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return banners;
  }
}
