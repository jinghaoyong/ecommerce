# Ecommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Todo Priority
classify the firebase's service // using files to classify
since now i using firebase as my backend, i got new collections to configure
- banner (get & insert & update & delete) , the body is {
    id ,
    imageSrc,
    title,
    desc 
    } 

- product (get & insert & update & delete) , the body is {
    id ,
    images, // string array to store, the string you no need to worry, i will store into the place which firestore usually store and get the url
    title,
    desc,
    categories // string array to store
    views, // int, to make the best popular
    soldAmount, //int
    topFavourite,// int
    entryDate,
    entryStaff,
    offerDiscount,int or any type you recommend to put in firestore
    lastEditedDate,
    lastEditedStaff
    } 
- categories (get & insert & update & delete) , the body is {
    id ,
    images, // string array to store, the string you no need to worry, i will store into the place which firestore usually store and get the url
    title,
    desc,
    subcategories // string array to store
    entryDate,
    entryStaff,
    lastEditedDate,
    lastEditedStaff
    } 
- subCategories (get & insert & update & delete) , the body is {
    id ,
    images, // string array to store, the string you no need to worry, i will store into the place which firestore usually store and get the url
    title,
    desc,
    entryDate,
    entryStaff,
    lastEditedDate,
    lastEditedStaff
    } 

- aboutUs (get & insert & update & delete) , the body is {
    images, // string array to store, the string you no need to worry, i will store into the place which firestore usually store and get the url
    title,
    desc,
    entryDate,
    entryStaff,
    lastEditedDate,
    lastEditedStaff
  } 

-socialMediaAccounts (get & insert & update & delete) , the body is {
    imageLogo, // string array to store, the string you no need to worry, i will store into the place which firestore usually store and get the url
    name,
    linkUrl
  } 
  -enquiryForm (get & insert & update & delete) , the body is {
    name,
    phone
    companyName,
    product,
    message
  } 
  -contact (get & insert & update & delete) , the body is {
    email,
    phone
    address,
    linkUrl
  } 


## Completed Task
firebase login logout and store in localstorage for the personal details with enctypted ✅
public scss variable which can be use everywhere when we just only need to do is `import ./style.scss`✅
navbar become responsive and always stay top when scroll to bottom, and being common which can be dynamically repalced the title, image and theme colour✅ 
font variable decared in style.scss and can be use everywhere✅ 
prefix translate of nav bar ✅
search bar in nav bar ✅
categories in nava bar ✅
2025(current year) collection (jsut filter out those product which is create on 2025 asc) ✅
top picker (filterd out those sell the most) ✅
summer(current season) product(jsut show within the quarter period) ✅
product details ✅
favourite ✅

## Pending To do
prefix translate
lazy loading
loading animation
ngrx angular
automatically angular testing
strucutre re-do
add chinese and melayu language for nav bar
## Pending Small Task
🔜 special content image size
🔜 shared service which make the navbar will whether hidden when scroll down
🔜 sitemap which enable google this kind of search engine more easier to crawl the website thing
🔜 search results page refer to shopee, for the concept of filtering from hashtag .. for loop the hastags and list all, as well as `relevance,top rate balbal condition`

copy shopee that filter at left side, product at right side

then other pending page
----- view more btn and its functions 🔜  done by thursday 
----- change the three category to single product 🔜  done by thursday  
----- search bar and search function (list the concept) 🔜  done by friday bus
----- search bar and search function (implement the concept) 🔜  done by saturday
----- blogpost from codepulse 🔜  done by sunday 
----- cater phone screen view 🔜  done by sunday 
- user info pop up chinese english
## env file environment.ts
export const environment = {
  production: false,
  defaultauth: 'fackbackend',
  firebaseProject_: { // for messaging
  },
  firebaseProject_notification: { // for notification
  }
};


to push code & deploy  to firebase : 
1> firebase login (for device which didn;t sign in yet)
2> firebase init , 
3> check outputpath : "/dist" in angular.json, jsut pass the value like '/dist' for public destination
3> ng build
4> firebase deploy



control + shirt + r , hard reload the whole page !!!