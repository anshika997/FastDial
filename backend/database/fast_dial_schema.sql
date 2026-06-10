-- ============================================================
-- FastDial Database Schema
-- Reverse-engineered from source code analysis
-- Generated: 2026-06-09
-- ============================================================

CREATE DATABASE IF NOT EXISTS fast_dial;
USE fast_dial;

-- ============================================================
-- CORE TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS ADMINS (
    admin_id INT NOT NULL AUTO_INCREMENT,
    admin_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    image VARCHAR(500),
    PRIMARY KEY (admin_id)
);

CREATE TABLE IF NOT EXISTS CUSTOMERS (
    customer_id INT NOT NULL AUTO_INCREMENT,
    mobile VARCHAR(20) NOT NULL,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_country VARCHAR(50),
    gender VARCHAR(10),
    customer_address JSON,
    customer_image VARCHAR(500),
    password VARCHAR(255),
    email_verified TINYINT(1) DEFAULT 0,
    email_otp VARCHAR(10),
    otp_expires_at TIMESTAMP NULL,
    PRIMARY KEY (customer_id)
);

CREATE TABLE IF NOT EXISTS VENDORS (
    vendor_id INT NOT NULL AUTO_INCREMENT,
    vendor_name VARCHAR(100),
    vendor_email VARCHAR(100) UNIQUE,
    vendor_password VARCHAR(255) NOT NULL,
    vendor_mobile VARCHAR(20),
    name_of_bussiness VARCHAR(200),
    bussiness_category VARCHAR(100),
    fast_service_category_name VARCHAR(100),
    bussiness_proof_doc_url VARCHAR(500),
    gst_number VARCHAR(50),
    company_category VARCHAR(100),
    service_radius INT,
    bussiness_address JSON,
    pincode VARCHAR(10),
    service_start_time VARCHAR(20),
    service_end_time VARCHAR(20),
    bussiness_desc TEXT,
    image_url JSON,
    account_details JSON,
    kyc_docs JSON,
    vendor_address JSON,
    whatsapp_number VARCHAR(20),
    annual_turnover VARCHAR(50),
    is_approved TINYINT(1) DEFAULT 0,
    is_verified TINYINT(1) DEFAULT 0,
    is_blocked TINYINT(1) DEFAULT 0,
    email_otp VARCHAR(10),
    otp_expires_at TIMESTAMP NULL,
    email_verified TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (vendor_id)
);

-- ============================================================
-- SERVICE MANAGEMENT
-- ============================================================

CREATE TABLE IF NOT EXISTS SERVICE_CATEGORIES (
    service_cat_id INT NOT NULL AUTO_INCREMENT,
    service_category_name VARCHAR(100),
    service_desc TEXT,
    service_category_url VARCHAR(500),
    PRIMARY KEY (service_cat_id)
);

CREATE TABLE IF NOT EXISTS SERVICES (
    service_id INT NOT NULL AUTO_INCREMENT,
    service_name VARCHAR(100),
    service_description TEXT,
    service_price DECIMAL(10,2),
    service_image_url VARCHAR(500),
    service_cat_id INT,
    PRIMARY KEY (service_id),
    FOREIGN KEY (service_cat_id) REFERENCES SERVICE_CATEGORIES(service_cat_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS VENDOR_SERVICES (
    id INT NOT NULL AUTO_INCREMENT,
    vendor_id INT NOT NULL,
    service_id INT NOT NULL,
    service_description TEXT,
    service_price DECIMAL(10,2),
    PRIMARY KEY (id),
    FOREIGN KEY (vendor_id) REFERENCES VENDORS(vendor_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES SERVICES(service_id) ON DELETE CASCADE
);

-- ============================================================
-- BOOKINGS
-- ============================================================

CREATE TABLE IF NOT EXISTS CUSTOMER_ADDRESSES (
    address_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    address JSON,
    PRIMARY KEY (address_id),
    FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SERVICEBOOKINGS (
    booking_id INT NOT NULL AUTO_INCREMENT,
    service_id INT,
    customer_id INT,
    vendor_id INT,
    address_id INT,
    is_booked TINYINT(1) DEFAULT 0,
    is_completed TINYINT(1) DEFAULT 0,
    is_cancelled TINYINT(1) DEFAULT 0,
    is_accept TINYINT(1) DEFAULT 0,
    cancelled_reason TEXT,
    cancelled_date TIMESTAMP NULL,
    completed_date TIMESTAMP NULL,
    booking_type VARCHAR(20) DEFAULT 'now',
    scheduled_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (booking_id),
    FOREIGN KEY (service_id) REFERENCES SERVICES(service_id),
    FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id),
    FOREIGN KEY (vendor_id) REFERENCES VENDORS(vendor_id),
    FOREIGN KEY (address_id) REFERENCES CUSTOMER_ADDRESSES(address_id)
);

-- ============================================================
-- PAYMENTS & SUBSCRIPTIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS SUBSCRIPTIONS (
    subscription_id INT NOT NULL AUTO_INCREMENT,
    subscription_name VARCHAR(100),
    duration_in_days INT,
    price DECIMAL(10,2),
    PRIMARY KEY (subscription_id)
);

CREATE TABLE IF NOT EXISTS VENDOR_SUBSCRIPTIONS (
    id INT NOT NULL AUTO_INCREMENT,
    vendor_id INT NOT NULL,
    subscription_id INT NOT NULL,
    expiry_date TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (vendor_id) REFERENCES VENDORS(vendor_id) ON DELETE CASCADE,
    FOREIGN KEY (subscription_id) REFERENCES SUBSCRIPTIONS(subscription_id)
);

CREATE TABLE IF NOT EXISTS SUBSCRIPTIONPAYMENTSBYVENDOR (
    payment_id INT NOT NULL AUTO_INCREMENT,
    vendor_id INT NOT NULL,
    subscription_id INT NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    razorpay_order_id VARCHAR(255),
    razorpay_payment_id VARCHAR(255),
    razorpay_signature VARCHAR(255),
    amount DECIMAL(10,2),
    PRIMARY KEY (payment_id),
    FOREIGN KEY (vendor_id) REFERENCES VENDORS(vendor_id),
    FOREIGN KEY (subscription_id) REFERENCES SUBSCRIPTIONS(subscription_id)
);

CREATE TABLE IF NOT EXISTS CUSTOMERPAYMENTS (
    payment_id INT NOT NULL AUTO_INCREMENT,
    booking_id INT NOT NULL,
    payment_amount DECIMAL(10,2),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_ref_no VARCHAR(255),
    PRIMARY KEY (payment_id),
    FOREIGN KEY (booking_id) REFERENCES SERVICEBOOKINGS(booking_id)
);

-- ============================================================
-- COMPLAINTS
-- ============================================================

CREATE TABLE IF NOT EXISTS CUSTOMERCOMPLAINTS (
    cust_comp_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT,
    complaint TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cust_comp_id),
    FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id)
);

CREATE TABLE IF NOT EXISTS VENDORSCOMPLAINTS (
    vend_comp_id INT NOT NULL AUTO_INCREMENT,
    vendor_id INT,
    complaint TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (vend_comp_id),
    FOREIGN KEY (vendor_id) REFERENCES VENDORS(vendor_id)
);

-- ============================================================
-- REVIEWS & FAVORITES
-- ============================================================

CREATE TABLE IF NOT EXISTS REVIEWS (
    review_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT,
    vendor_id INT,
    rating INT,
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (review_id),
    FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id),
    FOREIGN KEY (vendor_id) REFERENCES VENDORS(vendor_id)
);

CREATE TABLE IF NOT EXISTS FAVOURITES (
    id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    service_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES SERVICES(service_id) ON DELETE CASCADE
);

-- ============================================================
-- UI & CONTENT
-- ============================================================

CREATE TABLE IF NOT EXISTS SLIDER_IMAGES (
    id INT NOT NULL AUTO_INCREMENT,
    image_path VARCHAR(500),
    PRIMARY KEY (id)
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS NOTIFICATIONS (
    notification_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT,
    vendor_id INT,
    message TEXT,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (notification_id)
);

-- ============================================================
-- LOCATION TRACKING
-- ============================================================

CREATE TABLE IF NOT EXISTS LOCATION_TRACKING (
    id INT NOT NULL AUTO_INCREMENT,
    booking_id INT NOT NULL,
    user_id INT NOT NULL,
    user_type VARCHAR(20),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    accuracy DECIMAL(10,2),
    altitude DECIMAL(10,2),
    speed DECIMAL(10,2),
    heading DECIMAL(10,2),
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (booking_id) REFERENCES SERVICEBOOKINGS(booking_id)
);

-- ============================================================
-- CHAT SYSTEM (Customer-Vendor Chat)
-- ============================================================

CREATE TABLE IF NOT EXISTS chat_room (
    chat_room_id INT NOT NULL AUTO_INCREMENT,
    vendor_id INT,
    customer_id INT,
    admin_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (chat_room_id),
    UNIQUE KEY unique_vendor_customer (vendor_id, customer_id)
);

CREATE TABLE IF NOT EXISTS messages (
    message_id INT NOT NULL AUTO_INCREMENT,
    chat_room_id INT NOT NULL,
    sender_type ENUM('vendor', 'customer', 'admin'),
    sender_id INT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (message_id),
    FOREIGN KEY (chat_room_id) REFERENCES chat_room(chat_room_id)
);

-- ============================================================
-- CHAT SYSTEM (Admin-Vendor Chat)
-- ============================================================

CREATE TABLE IF NOT EXISTS chat_rooms (
    chat_room_id INT NOT NULL AUTO_INCREMENT,
    vendor_id INT,
    admin_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (chat_room_id)
);

CREATE TABLE IF NOT EXISTS chat_messages (
    message_id INT NOT NULL AUTO_INCREMENT,
    room_id INT NOT NULL,
    sender_type ENUM('vendor', 'admin'),
    sender_id INT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (message_id),
    FOREIGN KEY (room_id) REFERENCES chat_rooms(chat_room_id)
);

-- ============================================================
-- OTP
-- ============================================================

CREATE TABLE IF NOT EXISTS otp (
    id INT NOT NULL AUTO_INCREMENT,
    mobile VARCHAR(20) NOT NULL,
    vid VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- ============================================================
-- VIEWS
-- ============================================================

CREATE OR REPLACE VIEW service_with_category AS
SELECT
    s.service_id,
    s.service_name,
    s.service_description,
    s.service_price,
    s.service_image_url,
    sc.service_cat_id,
    sc.service_category_name,
    sc.service_desc AS category_description,
    sc.service_category_url
FROM SERVICES s
LEFT JOIN SERVICE_CATEGORIES sc ON s.service_cat_id = sc.service_cat_id;

CREATE OR REPLACE VIEW CUSTOMER_SERVICE_DETAILS AS
SELECT
    sb.booking_id,
    sb.service_id,
    sb.customer_id,
    sb.vendor_id,
    sb.is_booked,
    sb.is_completed,
    sb.is_cancelled,
    sb.is_accept,
    sb.booking_type,
    sb.scheduled_date,
    c.customer_name,
    c.mobile,
    s.service_name,
    sc.service_category_name
FROM SERVICEBOOKINGS sb
JOIN CUSTOMERS c ON sb.customer_id = c.customer_id
JOIN SERVICES s ON sb.service_id = s.service_id
LEFT JOIN SERVICE_CATEGORIES sc ON s.service_cat_id = sc.service_cat_id;

-- ============================================================
-- COMPLAINT VIEWS (required by admin dashboard)
-- ============================================================

CREATE OR REPLACE VIEW VendorComplaintsView AS
SELECT
    vc.vend_comp_id,
    vc.vendor_id,
    vc.complaint AS vend_comp_desc,
    vc.status,
    vc.created_at AS vend_comp_date,
    v.vendor_name,
    v.vendor_email,
    v.vendor_mobile
FROM vendorscomplaints vc
LEFT JOIN VENDORS v ON vc.vendor_id = v.vendor_id;

CREATE OR REPLACE VIEW CustomerComplaintsView AS
SELECT
    cc.cust_comp_id,
    cc.customer_id,
    cc.complaint AS cust_comp_desc,
    cc.status,
    cc.created_at AS cust_comp_date,
    c.customer_name,
    c.customer_email,
    c.mobile
FROM customercomplaints cc
LEFT JOIN CUSTOMERS c ON cc.customer_id = c.customer_id;

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO SUBSCRIPTIONS (subscription_name, duration_in_days, price)
VALUES ('Free Trial', 30, 0.00);
