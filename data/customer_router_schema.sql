-- ============================================================
--  FastDial Database Schema
--  Tables used in customersRouter.js + controllers
--  Engine: MySQL / InnoDB
-- ============================================================

CREATE DATABASE IF NOT EXISTS fastdial;
USE fastdial;

-- ============================================================
-- 1. SERVICE_CATEGORIES
--    Referenced by: SERVICES, getSERVICE_CATEGORIES route
-- ============================================================
CREATE TABLE IF NOT EXISTS SERVICE_CATEGORIES (
  service_cat_id    INT           AUTO_INCREMENT PRIMARY KEY,
  service_category_name VARCHAR(255) NOT NULL,
  service_desc      TEXT,
  service_category_url  VARCHAR(1024),
  created_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- ============================================================
-- 2. SERVICES
--    Referenced by: getSERVICES route, SERVICEBOOKINGS, FAVOURITE_SERVICES
-- ============================================================
CREATE TABLE IF NOT EXISTS SERVICES (
  service_id        INT           AUTO_INCREMENT PRIMARY KEY,
  service_cat_id    INT,
  service_name      VARCHAR(255)  NOT NULL,
  service_description TEXT,
  service_price     DECIMAL(10,2) DEFAULT 0.00,
  service_image_url VARCHAR(1024),
  created_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_cat_id) REFERENCES SERVICE_CATEGORIES(service_cat_id) ON DELETE SET NULL
) ENGINE=InnoDB;


-- ============================================================
-- 3. VENDORS
--    Referenced by: getvendors, getVendorsForCustomer, SERVICEBOOKINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS VENDORS (
  vendor_id             INT          AUTO_INCREMENT PRIMARY KEY,
  vendor_name           VARCHAR(255),
  vendor_email          VARCHAR(255),
  vendor_mobile         VARCHAR(20),
  name_of_bussiness     VARCHAR(255),
  bussiness_category    VARCHAR(255),
  fast_service_category_name VARCHAR(255),
  gst_number            VARCHAR(50),
  image_url             TEXT,
  vendor_address        TEXT,
  whatsapp_number       VARCHAR(20),
  is_approved           BOOLEAN      DEFAULT FALSE,
  is_verified           BOOLEAN      DEFAULT FALSE,
  created_at            TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- ============================================================
-- 4. VENDOR_SERVICES
--    Vendor ki apni pricing aur description per service
--    Referenced by: getVENDORS_SERVICES_BY_CATEGORY, SERVICEBOOKINGS JOINs
-- ============================================================
CREATE TABLE IF NOT EXISTS VENDOR_SERVICES (
  vendor_id           INT           NOT NULL,
  service_id          INT           NOT NULL,
  service_description TEXT,
  service_price       DECIMAL(10,2) DEFAULT 0.00,
  created_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (vendor_id, service_id),
  FOREIGN KEY (vendor_id)  REFERENCES VENDORS(vendor_id)  ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES SERVICES(service_id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ============================================================
-- 5. VENDOR_SUBSCRIPTIONS
--    Referenced by: getAllVendorsWithServices (active subscription check)
-- ============================================================
CREATE TABLE IF NOT EXISTS VENDOR_SUBSCRIPTIONS (
  subscription_id INT       AUTO_INCREMENT PRIMARY KEY,
  vendor_id       INT       NOT NULL,
  status          ENUM('active','inactive','expired') DEFAULT 'inactive',
  start_date      DATE,
  end_date        DATE,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vendor_id) REFERENCES VENDORS(vendor_id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ============================================================
-- 6. SUBSCRIPTIONPAYMENTSBYVENDOR
--    Referenced by: getAllVendorsWithServices (renewal_date check)
-- ============================================================
CREATE TABLE IF NOT EXISTS SUBSCRIPTIONPAYMENTSBYVENDOR (
  sub_payment_id  INT       AUTO_INCREMENT PRIMARY KEY,
  vendor_id       INT       NOT NULL,
  payment_details JSON,     -- contains renewal_date, amount, etc.
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vendor_id) REFERENCES VENDORS(vendor_id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ============================================================
-- 7. CUSTOMERS
--    Core customer table — login, profile
-- ============================================================
CREATE TABLE IF NOT EXISTS CUSTOMERS (
  customer_id       INT          AUTO_INCREMENT PRIMARY KEY,
  mobile            VARCHAR(20)  NOT NULL UNIQUE,
  customer_name     VARCHAR(255),
  customer_email    VARCHAR(255),
  customer_country  VARCHAR(100),
  gender            VARCHAR(20),
  customer_address  JSON,        -- stored as JSON object
  customer_image    TEXT,
  created_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- ============================================================
-- 8. otp
--    OTP login ke liye temporary store
-- ============================================================
CREATE TABLE IF NOT EXISTS otp (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  mobile     VARCHAR(20)  NOT NULL,
  vid        VARCHAR(255) NOT NULL,   -- Fast2SMS verification ID
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- ============================================================
-- 9. CUSTOMER_ADDRESSES
--    Customer ke multiple saved addresses
-- ============================================================
CREATE TABLE IF NOT EXISTS CUSTOMER_ADDRESSES (
  address_id  INT       AUTO_INCREMENT PRIMARY KEY,
  customer_id INT       NOT NULL,
  address     JSON      NOT NULL,   -- {street, city, state, zip}
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ============================================================
-- 10. SERVICEBOOKINGS
--     Core booking table
-- ============================================================
CREATE TABLE IF NOT EXISTS SERVICEBOOKINGS (
  booking_id       INT       AUTO_INCREMENT PRIMARY KEY,
  service_id       INT,
  customer_id      INT,
  vendor_id        INT,
  address_id       INT,
  booking_type     ENUM('now','later') DEFAULT 'now',
  scheduled_date   DATETIME,
  is_booked        BOOLEAN   DEFAULT FALSE,
  is_completed     BOOLEAN   DEFAULT FALSE,
  is_cancelled     BOOLEAN   DEFAULT FALSE,
  is_accept        BOOLEAN   DEFAULT FALSE,
  cancelled_reason TEXT,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id)  REFERENCES SERVICES(service_id)               ON DELETE SET NULL,
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id)             ON DELETE SET NULL,
  FOREIGN KEY (vendor_id)   REFERENCES VENDORS(vendor_id)                 ON DELETE SET NULL,
  FOREIGN KEY (address_id)  REFERENCES CUSTOMER_ADDRESSES(address_id)     ON DELETE SET NULL
) ENGINE=InnoDB;


-- ============================================================
-- 11. CUSTOMERCOMPLAINTS
--     Customer complaints against bookings/vendors
-- ============================================================
CREATE TABLE IF NOT EXISTS CUSTOMERCOMPLAINTS (
  cust_comp_id  INT          AUTO_INCREMENT PRIMARY KEY,
  customer_id   INT,
  booking_id    INT,
  complaint     TEXT,
  status        ENUM('open','in_progress','resolved') DEFAULT 'open',
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id)   ON DELETE SET NULL,
  FOREIGN KEY (booking_id)  REFERENCES SERVICEBOOKINGS(booking_id) ON DELETE SET NULL
) ENGINE=InnoDB;


-- ============================================================
-- 12. CUSTOMERPAYMENTS
--     Payment records (Razorpay online + Cash)
-- ============================================================
CREATE TABLE IF NOT EXISTS CUSTOMERPAYMENTS (
  payment_id     INT           AUTO_INCREMENT PRIMARY KEY,
  booking_id     INT,
  payment_amount DECIMAL(10,2),
  payment_ref_no VARCHAR(255),   -- Razorpay payment_id ya "CASH"
  payment_date   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES SERVICEBOOKINGS(booking_id) ON DELETE SET NULL
) ENGINE=InnoDB;


-- ============================================================
-- 13. REVIEWS
--     Customer reviews for services/vendors
-- ============================================================
CREATE TABLE IF NOT EXISTS REVIEWS (
  review_id   INT       AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  vendor_id   INT,
  service_id  INT,
  booking_id  INT,
  rating      TINYINT   CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id)      ON DELETE SET NULL,
  FOREIGN KEY (vendor_id)   REFERENCES VENDORS(vendor_id)          ON DELETE SET NULL,
  FOREIGN KEY (service_id)  REFERENCES SERVICES(service_id)        ON DELETE SET NULL,
  FOREIGN KEY (booking_id)  REFERENCES SERVICEBOOKINGS(booking_id) ON DELETE SET NULL
) ENGINE=InnoDB;


-- ============================================================
-- 14. FAVOURITE_SERVICES
--     Customer ke favourite/saved services
-- ============================================================
CREATE TABLE IF NOT EXISTS FAVOURITE_SERVICES (
  fav_id      INT       AUTO_INCREMENT PRIMARY KEY,
  customer_id INT       NOT NULL,
  service_id  INT       NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_fav (customer_id, service_id),
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id) ON DELETE CASCADE,
  FOREIGN KEY (service_id)  REFERENCES SERVICES(service_id)  ON DELETE CASCADE
) ENGINE=InnoDB;


-- ============================================================
-- 15. NOTIFICATIONS
--     Customer notifications (booking confirm, etc.)
-- ============================================================
CREATE TABLE IF NOT EXISTS NOTIFICATIONS (
  notification_id INT       AUTO_INCREMENT PRIMARY KEY,
  customer_id     INT,
  message         TEXT      NOT NULL,
  is_read         BOOLEAN   DEFAULT FALSE,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ============================================================
-- 16. LOCATION_TRACKING
--     Real-time location — customer aur vendor dono ke liye
-- ============================================================
CREATE TABLE IF NOT EXISTS LOCATION_TRACKING (
  tracking_id INT       AUTO_INCREMENT PRIMARY KEY,
  user_id     INT       NOT NULL,
  user_type   ENUM('customer','vendor') NOT NULL,
  latitude    DECIMAL(10,7) NOT NULL,
  longitude   DECIMAL(10,7) NOT NULL,
  booking_id  INT,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_tracking (user_id, user_type, booking_id),
  FOREIGN KEY (booking_id) REFERENCES SERVICEBOOKINGS(booking_id) ON DELETE SET NULL
) ENGINE=InnoDB;


-- ============================================================
-- 17. SLIDER_IMAGES
--     Home screen slider images (AWS S3 ya local)
-- ============================================================
CREATE TABLE IF NOT EXISTS SLIDER_IMAGES (
  id          INT          AUTO_INCREMENT PRIMARY KEY,
  image_path  TEXT         NOT NULL,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- ============================================================
-- 18. CUSTOMER_SERVICE_DETAILS  (VIEW)
--     getcustomerservicedetails route mein use hoti hai
--     Customers + Bookings + Services ka combined view
-- ============================================================
CREATE OR REPLACE VIEW CUSTOMER_SERVICE_DETAILS AS
SELECT
  c.customer_id,
  c.customer_name,
  c.mobile,
  c.customer_email,
  sb.booking_id,
  sb.booking_type,
  sb.scheduled_date,
  sb.is_booked,
  sb.is_completed,
  sb.is_cancelled,
  sb.vendor_id,
  s.service_id,
  s.service_name,
  s.service_description,
  s.service_price,
  s.service_image_url,
  sc.service_cat_id,
  sc.service_category_name,
  sc.service_category_url
FROM CUSTOMERS c
JOIN SERVICEBOOKINGS sb   ON c.customer_id  = sb.customer_id
JOIN SERVICES s           ON sb.service_id  = s.service_id
JOIN SERVICE_CATEGORIES sc ON s.service_cat_id = sc.service_cat_id;
