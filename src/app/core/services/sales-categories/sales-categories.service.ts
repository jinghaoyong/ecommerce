import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';
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
    let productQuery;

    if (category) {
      productQuery = query(
        collection(db, "products"),
        where("categories", "array-contains", category)
      );
    } else {
      productQuery = query(
        collection(db, "products")
      );
    }

    const productsSnapshot = await getDocs(productQuery);

    const products: any[] = [];
    productsSnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return products;
  }

  // Best Seller: Sorted by soldCount (highest first)
  async getBestSellers(category?: string): Promise<any[]> {
    let productQuery;

    if (category) {
      productQuery = query(
        collection(db, "products"),
        where("categories", "array-contains", category),
        orderBy("soldCount", "desc")
      );
    } else {
      productQuery = query(
        collection(db, "products"),
        orderBy("soldCount", "desc")
      );
    }

    const productsSnapshot = await getDocs(productQuery);
    return productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  // New Arrival: Sorted by createdAt (latest first)
  async getNewArrivals(category?: string): Promise<any[]> {
    let productQuery;

    if (category) {
      productQuery = query(
        collection(db, "products"),
        where("categories", "array-contains", category),
        orderBy("createdAt", "desc")
      );
    } else {
      productQuery = query(
        collection(db, "products"),
        orderBy("createdAt", "desc")
      );
    }

    const productsSnapshot = await getDocs(productQuery);
    return productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  // Most Viewed: Sorted by viewed count (highest first)
  async getMostViewed(category?: string): Promise<any[]> {
    let productQuery;

    if (category) {
      productQuery = query(
        collection(db, "products"),
        where("categories", "array-contains", category),
        orderBy("viewed", "desc")
      );
    } else {
      productQuery = query(
        collection(db, "products"),
        orderBy("viewed", "desc")
      );
    }

    const productsSnapshot = await getDocs(productQuery);
    return productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}
