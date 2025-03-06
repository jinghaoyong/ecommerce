import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { environment } from '../../../../environments/environment';


// Initialize Firebase
const app = initializeApp(environment.firebaseProject_);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class DiscountProductsService {

  constructor() { }
  async getDealOfTheWeekProducts(): Promise<any[]> {
    const productQuery = query(
      collection(db, "products"),
      where("dealOfTheWeek", "==", true) // Filter where dealOfTheWeek is true
    );

    const productsSnapshot = await getDocs(productQuery);
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  }
}
