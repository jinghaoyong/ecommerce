import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, DocumentData, getDocs, getFirestore, limit, orderBy, query, QueryDocumentSnapshot, startAfter } from 'firebase/firestore';
import { environment } from '../../../../environments/environment';


// Initialize Firebase
const app = initializeApp(environment.firebaseProject_);
const db = getFirestore(app);
const PRODUCTS_PAGE_SIZE = 6;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  async getBestSellingProducts(lastVisible?: QueryDocumentSnapshot<DocumentData> | null) {
    try {
      const productsRef = collection(db, 'products');
      let productsQuery;

      if (lastVisible) {
        productsQuery = query(
          productsRef,
          orderBy('soldCount', 'desc'),
          limit(PRODUCTS_PAGE_SIZE),
          startAfter(lastVisible)
        );
      } else {
        productsQuery = query(
          productsRef,
          orderBy('soldCount', 'desc'),
          limit(PRODUCTS_PAGE_SIZE)
        );
      }

      const querySnapshot = await getDocs(productsQuery);

      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

      return {
        products,
        lastVisible: newLastVisible
      };
    } catch (error) {
      console.error('Error fetching best-selling products:', error);
      throw error;
    }
  }

  async getNewArrivalProducts(lastVisible?: QueryDocumentSnapshot<DocumentData> | null) {
    try {
      const productsRef = collection(db, 'products');
      let productsQuery;

      if (lastVisible) {
        productsQuery = query(
          productsRef,
          orderBy('createdAt', 'desc'),
          limit(PRODUCTS_PAGE_SIZE),
          startAfter(lastVisible)
        );
      } else {
        productsQuery = query(
          productsRef,
          orderBy('createdAt', 'desc'),
          limit(PRODUCTS_PAGE_SIZE)
        );
      }

      const querySnapshot = await getDocs(productsQuery);

      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

      return {
        products,
        lastVisible: newLastVisible
      };
    } catch (error) {
      console.error('Error fetching new arrival products:', error);
      throw error;
    }
  }



  async getMostViewedProducts(lastVisible?: QueryDocumentSnapshot<DocumentData> | null) {

    try {
      const productsRef = collection(db, 'products');
      let productsQuery;

      if (lastVisible) {
        productsQuery = query(
          productsRef,
          orderBy('viewed', 'desc'),
          limit(PRODUCTS_PAGE_SIZE),
          startAfter(lastVisible)
        );
      } else {
        productsQuery = query(
          productsRef,
          orderBy('viewed', 'desc'),
          limit(PRODUCTS_PAGE_SIZE)
        );
      }

      const querySnapshot = await getDocs(productsQuery);

      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

      return {
        products,
        lastVisible: newLastVisible
      };
    } catch (error) {
      console.error('Error fetching most viewed products:', error);
      throw error;
    }
  }
}
