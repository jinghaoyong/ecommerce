import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, where } from 'firebase/firestore';
import { environment } from '../../../../environments/environment';

// Initialize Firebase
const app = initializeApp(environment.firebaseProject_);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor() { }
  async getProductById(productId: string) {
    try {
      const productDocRef = doc(db, 'products', productId);
      const docSnap = await getDoc(productDocRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting product by ID:', error);
      throw error;
    }
  }
}
