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
  
  export enum LOCAL_STORAGE_ITEM_NAME {
    MY_INFO = 'MY-INFO',
    MY_INFO_TYPE = 'MY-INFO_TYPE',
    MY_INFO_CLIENT_TYPE = 'MY-INFO_CLIENT_TYPE',
    ROUTING_INFO = 'ROUTING-INFO',
    GUARANTOR_FORM = 'GUARANTOR-FORM',
    FILL_INDEX = 'FILL-INDEX',
    USER_INFO = 'USER',
    LOGIN_KEY = 'LOGIN-KEY',
    FLOOR_VEHICLE_CODE = 'VEHICLE-CODE',
    VALIDATE_LOGINID = 'VALIDATE-LOGINID',
    VALIDATE_CODE = 'VALIDATE-CODE',
    VALIDATE_PW = 'VALIDATE-PW',
    VALIDATE_TYPE = 'VALIDATE-TYPE',
    VALIDATE_OTP = 'VALIDATE-OTP',
    VALIDATE_EMAIL = 'VALIDATE-EMAIL',
    VALIDATE_MOBILE = 'VALIDATE-MOBILE',
    CONTACT_ID = 'CONTACT-ID'
  }