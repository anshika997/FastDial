CREATE TABLE SERVICE_CATEGORIES (
  service_cat_id        INT           AUTO_INCREMENT PRIMARY KEY,
  service_category_name VARCHAR(100)  NOT NULL,
  service_desc          TEXT          DEFAULT NULL,
  service_category_url  VARCHAR(255)  DEFAULT NULL
);

CREATE TABLE SERVICES (
  service_id        INT          AUTO_INCREMENT PRIMARY KEY,
  service_name      VARCHAR(100) NOT NULL,
  service_cat_id    INT          NOT NULL,
  service_image_url VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (service_cat_id) REFERENCES SERVICE_CATEGORIES(service_cat_id)
);

CREATE TABLE VENDORS (
  vendor_id                   INT           AUTO_INCREMENT PRIMARY KEY,
  vendor_name                 VARCHAR(100)  NOT NULL,
  vendor_email                VARCHAR(100)  NOT NULL UNIQUE,
  vendor_password             VARCHAR(255)  NOT NULL,
  vendor_mobile               VARCHAR(15)   DEFAULT NULL,
  name_of_bussiness           VARCHAR(150)  NOT NULL,
  bussiness_category          VARCHAR(100)  NOT NULL,
  fast_service_category_name  VARCHAR(100)  DEFAULT NULL,
  bussiness_proof_doc_url     VARCHAR(255)  DEFAULT NULL,
  gst_number                  VARCHAR(50)   DEFAULT NULL,
  company_category            VARCHAR(100)  DEFAULT NULL,
  service_radius              VARCHAR(50)   DEFAULT NULL,
  bussiness_address           VARCHAR(255)  DEFAULT NULL,
  pincode                     VARCHAR(10)   DEFAULT NULL,
  service_start_time          TIME          DEFAULT NULL,
  service_end_time            TIME          DEFAULT NULL,
  bussiness_desc              TEXT          DEFAULT NULL,
  image_url                   JSON          DEFAULT NULL,
  account_details             JSON          DEFAULT NULL,
  kyc_docs                    JSON          DEFAULT NULL,
  is_approved                 TINYINT(1)    DEFAULT 0,
  approved_by                 INT           DEFAULT NULL,
  approved_date               DATETIME      DEFAULT NULL,
  is_rejected                 TINYINT(1)    DEFAULT 0,
  rejected_by                 INT           DEFAULT NULL,
  rejected_date               DATETIME      DEFAULT NULL,
  is_blocked                  TINYINT(1)    DEFAULT 0,
  blocked_reason              VARCHAR(255)  DEFAULT NULL,
  blocked_date                DATETIME      DEFAULT NULL,
  is_verified                 TINYINT(1)    DEFAULT 0,
  vendor_address              VARCHAR(255)  DEFAULT NULL
);

CREATE TABLE VENDOR_SERVICES (
  id                  INT            AUTO_INCREMENT PRIMARY KEY,
  vendor_id           INT            NOT NULL,
  service_id          INT            NOT NULL,
  service_description TEXT           DEFAULT NULL,
  service_price       DECIMAL(10,2)  DEFAULT NULL,
  FOREIGN KEY (vendor_id)  REFERENCES VENDORS(vendor_id),
  FOREIGN KEY (service_id) REFERENCES SERVICES(service_id)
);

CREATE TABLE CUSTOMERS (
  customer_id      INT          AUTO_INCREMENT PRIMARY KEY,
  customer_name    VARCHAR(100) NOT NULL,
  customer_email   VARCHAR(100) UNIQUE,
  mobile           VARCHAR(15)  DEFAULT NULL,
  customer_country VARCHAR(100) DEFAULT NULL,
  gender           VARCHAR(20)  DEFAULT NULL,
  customer_address VARCHAR(255) DEFAULT NULL
);

CREATE TABLE SERVICEBOOKINGS (
  booking_id  INT      AUTO_INCREMENT PRIMARY KEY,
  customer_id INT      NOT NULL,
  vendor_id   INT      NOT NULL,
  service_id  INT      NOT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id),
  FOREIGN KEY (vendor_id)   REFERENCES VENDORS(vendor_id),
  FOREIGN KEY (service_id)  REFERENCES SERVICES(service_id)
);

CREATE TABLE CUSTOMERPAYMENTS (
  payment_id     INT            AUTO_INCREMENT PRIMARY KEY,
  booking_id     INT            NOT NULL,
  payment_amount DECIMAL(10,2)  NOT NULL,
  payment_date   DATETIME       NOT NULL,
  payment_ref_no VARCHAR(100)   DEFAULT NULL,
  FOREIGN KEY (booking_id) REFERENCES SERVICEBOOKINGS(booking_id)
);

CREATE TABLE SUBSCRIPTIONS (
  subscription_id   INT          AUTO_INCREMENT PRIMARY KEY,
  subscription_name VARCHAR(100) NOT NULL
);

CREATE TABLE SUBSCRIPTIONPAYMENTSBYVENDOR (
  payment_id      INT      AUTO_INCREMENT PRIMARY KEY,
  vendor_id       INT      NOT NULL,
  subscription_id INT      NOT NULL,
  payment_details JSON     DEFAULT NULL,
  payment_date    DATETIME NOT NULL,
  FOREIGN KEY (vendor_id)       REFERENCES VENDORS(vendor_id),
  FOREIGN KEY (subscription_id) REFERENCES SUBSCRIPTIONS(subscription_id)
);

CREATE TABLE VENDOR_SUBSCRIPTIONS (
  id              INT         AUTO_INCREMENT PRIMARY KEY,
  vendor_id       INT         NOT NULL,
  subscription_id INT         NOT NULL,
  start_date      DATE        NOT NULL,
  expiry_date     DATE        NOT NULL,
  status          VARCHAR(20) DEFAULT 'active',
  FOREIGN KEY (vendor_id)       REFERENCES VENDORS(vendor_id),
  FOREIGN KEY (subscription_id) REFERENCES SUBSCRIPTIONS(subscription_id)
);

CREATE TABLE REVIEWS (
  review_id   INT      AUTO_INCREMENT PRIMARY KEY,
  vendor_id   INT      NOT NULL,
  customer_id INT      NOT NULL,
  booking_id  INT      DEFAULT NULL,
  rating      INT      NOT NULL,
  review_text TEXT     DEFAULT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT NULL,
  FOREIGN KEY (vendor_id)   REFERENCES VENDORS(vendor_id),
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id),
  FOREIGN KEY (booking_id)  REFERENCES SERVICEBOOKINGS(booking_id)
);