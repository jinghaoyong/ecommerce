export enum BOOTSTRAP_TYPE {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  ALERT_LINK = 'alert-link',
}

export enum MODAL_NAME {
  CONTACT_DETAILS = 'contact_details'
}

export enum COMPANY_NAME {
  COMPANY_A = 'CompanyA',
  COMPANY_B = 'CompanyB'
}

export enum ROUTE_PAGE_RECORD {
  INITIAL_ROUTE_KEY = 'initialRoute',
  DETAILS_ROOT_PAGE_KEY = 'detailsRootPage'
}

export enum LTA_ROUTE {
  TRANSFER = 'LTA - Enquire Vehicle Transfer Fee',
  REBATE = 'LTA - Enquire PARF/COE Rebate'
}

export enum FILTER_TYPE {
  Text = 1,
  Date = 2,/*From and To Date*/
  Dropdown = 3, /*Drop down type*/

  Int = 10,/*Numeric whole number -  From and To*/
  Double = 11 /*Double with 2 decimal places -  From and To*/
}

export enum LIST_TYPE {
  Text = 1,
  Boolean = 2,/*Display with check and cross*/

  Int = 10, /*Numeric Display whole number*/
  Double = 11/*Numeric with 2 decimal places*/
}

export enum Vehicle_New_Or_Used {
  NEW = 'NEW',
  USED = 'USED'
}

export enum COST_ITEM_IDS {
  GSTTYPE = 'GSTTYPE',
  DEFAULTVALUE = 'DEFAULTVALUE',
  ISSALESITEM = 'ISSALESITEM'
}

export enum MODULE_TYPE {
  PA = 1,
  SA = 2,
  SO = 3
}

export enum VOUCHER_TYPE {
  VENDOR_INVOICE = 'V',
  SALES_INVOICE = 'I',
  PAYMENT = 'P',
  RECEIPT = 'R'
}

export enum TAB_TYPE {
  PA_DETAILS = 10,
  PA_TRANSACTION = 20,
  PA_HANDOVER = 30,
  PA_ATTACHMENT = 40,
}

export enum SINGAPORE_NATIONALITY {
  SINGAPORE_CITIZEN = 'SINGAPORE CITIZEN',
  SINGAPORE_PR = 'SINGAPORE PR'
}

export enum APPLICANT_TYPE {
  PERSON = 'PERSON',
  COMPANY = 'COMPANY',
}

export enum CLIENT_TYPE {
  APPLICANT = 'APPLICANT',
  GUARANTOR = 'GUARANTOR',
}

export enum LOGIN_MODAL_STATUS {
  SHOW = 'true',
  HIDE = 'false'
}

export enum LOCAL_STORAGE_ITEM_NAME {
  ROUTING_INFO = 'ROUTING-INFO',
  CURRENT_USER = 'CURRENT-USER-E-COMMERCE',
  LAST_ACTIVITY = 'LAST-ACTIVITY-E-COMMERCE',
  SHOW_LOGIN_MODAL = 'SHOW-LOGIN-MODAL-E-COMMERCE',
  APP_USR = 'APP-USR-E-COMMERCE',
  INITIAL_ROUTE_KEY = 'INITIAL-ROUTE-KEY-E-COMMERCE',
  DETAILS_ROOT_PAGE_KEY = 'DETAILS-ROOT-PAGE_KEY-E-COMMERCE'
}

export enum SPECIAL_CONTENT_STRING {
  MOST_VIEWED = "mostViewed",
  BEST_SELLING = "bestSeller",
  NEW_ARRIVAL = "newArrivals",
}