import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountProductsService {

  constructor() { }
  // async getBestSellerProducts(): Promise<any[]> {
  //   const productsSnapshot = await getDocs(
  //     query(collection(db, "products"), where("categories", "array-contains", "bestSeller"))
  //   );
  
  //   const products: any[] = [];
  //   productsSnapshot.forEach((doc) => {
  //     products.push({
  //       id: doc.id,
  //       ...doc.data(),
  //     });
  //   });
  
  //   return products;
  // }
}
