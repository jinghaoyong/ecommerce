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
export class FavouriteService {

  constructor() { }

  async getProductById(productId: string): Promise<any | null> {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return {
        id: productSnap.id,
        ...productSnap.data(),
      };
    } else {
      return null;
    }
  }

  async getProductsByIds(productIds: string[]): Promise<any[]> {
    const products: any[] = [];
  
    for (const productId of productIds) {
      const productRef = doc(db, 'products', productId);
      const productSnap = await getDoc(productRef);
  
      if (productSnap.exists()) {
        products.push({
          id: productSnap.id,
          ...productSnap.data(),
        });
      }
    }
  
    return products;
  }
}
