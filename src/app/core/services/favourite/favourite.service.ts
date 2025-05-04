import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc, where } from 'firebase/firestore';
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

  async getShoppingCartByUserId(userId: string): Promise<any[]> {
    const cartRef = doc(db, 'shoppingCart', userId);
    const cartSnap: any = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const data = cartSnap.data();
      return data.items || [];
    }

    return [];
  }


  // async addItemToShoppingCart(userId: string, product: any): Promise<void> {
  //   const cartRef = doc(db, 'shoppingCart', userId);
  //   const cartSnap: any = await getDoc(cartRef);

  //   let items: any[] = [];

  //   if (cartSnap.exists()) {
  //     items = cartSnap.data().items || [];
  //   }

  //   const index = items.findIndex(item => item.id === product.id);

  //   if (index !== -1) {
  //     // Increase quantity if product already exists
  //     items[index].quantity = (items[index].quantity || 1) + 1;
  //   } else {
  //     // Add new product
  //     items.push({ ...product, quantity: 1 });
  //   }

  //   await setDoc(cartRef, { items });
  // }

  async addItemToShoppingCart(userId: string, product: any): Promise<void> {
    const cartRef = doc(db, 'shoppingCart', userId);
    const cartSnap: any = await getDoc(cartRef);

    let items: any[] = [];

    if (cartSnap.exists()) {
      items = cartSnap.data().items || [];
    }

    // Check if product already exists in the cart
    const alreadyExists = items.some(item => item.id === product.id);

    if (alreadyExists) {
      // Do nothing, product already in cart
      console.log('Item already in cart, skipping...');
      return;
    }

    // Add new product with quantity: 1 (can also remove quantity if irrelevant)
    items.push({ ...product, quantity: 1 });

    await setDoc(cartRef, { items });
    console.log('Item added to cart');
  }


  async updateCartItemQuantity(userId: string, productId: string, change: number): Promise<void> {
    const cartRef = doc(db, 'shoppingCart', userId);
    const cartSnap: any = await getDoc(cartRef);

    if (!cartSnap.exists()) return;

    let items = cartSnap.data().items || [];

    const index = items.findIndex((item: any) => item.id === productId);

    if (index === -1) return;

    items[index].quantity += change;

    if (items[index].quantity <= 0) {
      items.splice(index, 1); // Remove item
    }

    await setDoc(cartRef, { items });
  }

  async removeItemFromCart(userId: string, productId: string): Promise<void> {
    const cartRef = doc(db, 'shoppingCart', userId);
    const cartSnap: any = await getDoc(cartRef);

    if (!cartSnap.exists()) return;

    const items = cartSnap.data().items || [];
    const updatedItems = items.filter((item: any) => item.id !== productId);

    await setDoc(cartRef, { items: updatedItems });
  }



}
