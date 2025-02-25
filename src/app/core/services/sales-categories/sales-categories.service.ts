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
export class SalesCategoriesService {

  constructor() { }

  async getProductsByCategories(category: string): Promise<any[]> {
    const productsSnapshot = await getDocs(
      query(collection(db, "products"), where("categories", "array-contains", category))
    );

    const products: any[] = [];
    productsSnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return products;
  }
}
