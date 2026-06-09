DROP DATABASE IF EXISTS gia_form;

CREATE DATABASE gia_form;

USE gia_form;

DROP TABLE IF EXISTS users;
CREATE TABLE users (

  user_id int NOT NULL AUTO_INCREMENT,
  user_mobile decimal(10,0) DEFAULT NULL,
  user_name varchar(50) DEFAULT NULL,
  is_verified tinyint(1) DEFAULT '1',
  email varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (user_id)

);

DROP TABLE IF EXISTS admins;
CREATE TABLE admins (
	admin_id INT NOT NULL AUTO_INCREMENT,
	admin_mobile NUMERIC(10,0),
   admin_name VARCHAR(50),
     email varchar(50) DEFAULT NULL,
   `password` varchar(100) DEFAULT NULL,
   PRIMARY KEY (admin_id)
);

DROP TABLE IF EXISTS vendors;
CREATE TABLE vendors(
   vendor_id int NOT NULL AUTO_INCREMENT,
  vendor_number decimal(10,0) DEFAULT NULL,
  vendor_name varchar(50) DEFAULT NULL,
  vendor_email varchar(50) DEFAULT NULL,
  vendor_aadhar_url varchar(255) DEFAULT NULL,
  vendor_pan_url varchar(255) DEFAULT NULL,
  vendor_bussiness_name varchar(100) DEFAULT NULL,
  venndor_bussiness_address varchar(255) DEFAULT NULL,
  vendor_registration_document_url varchar(255) DEFAULT NULL,
  is_otp_verified tinyint(1) DEFAULT '0',
  verification_status varchar(20) DEFAULT 'PENDING',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  email varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (vendor_id)

);

DROP TABLE IF EXISTS services;
CREATE TABLE services(
	service_id int NOT NULL AUTO_INCREMENT,
  service_name varchar(50) DEFAULT NULL,
  PRIMARY KEY (service_id)
);

DROP TABLE IF EXISTS affidavit_requests;
CREATE TABLE affidavit_requests(
	 request_id int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  address varchar(255) DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  place varchar(255) DEFAULT NULL,
  statement varchar(255) DEFAULT NULL,
  id_proof_url varchar(255) DEFAULT NULL,
  address_proof_url varchar(255) DEFAULT NULL,
  supporting_docs_url varchar(255) DEFAULT NULL,
  photo_url varchar(255) DEFAULT NULL,
  witness_name varchar(100) DEFAULT NULL,
  witness_signature_url varchar(255) DEFAULT NULL,
  notarization_certificate_url varchar(255) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  assigned_vendor decimal(10,0) DEFAULT NULL,
  rejected_by varchar(100) DEFAULT NULL,
  rejected_reason varchar(100) DEFAULT NULL,
  narration varchar(100) DEFAULT NULL,
  service_type varchar(100) DEFAULT NULL,
  is_approved tinyint(1) DEFAULT '0',
  approved_by varchar(50) DEFAULT NULL,
  approved_date timestamp NULL DEFAULT NULL,
  PRIMARY KEY (request_id)
);

DROP TABLE IF EXISTS otp;
CREATE TABLE otp (
	id INT NOT NULL AUTO_INCREMENT,
	mobile VARCHAR(50) NOT NULL,
	vid VARCHAR(10) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS gst_registration_proprietorship;
CREATE TABLE gst_registration_proprietorship (
   id int NOT NULL AUTO_INCREMENT,
  photo_url varchar(255) DEFAULT NULL,
  pan_url varchar(255) DEFAULT NULL,
  aadhar_url varchar(255) DEFAULT NULL,
  bank_acc_number decimal(20,0) DEFAULT NULL,
  bank_acc_name varchar(50) DEFAULT NULL,
  bank_ifsc_code varchar(20) DEFAULT NULL,
  email_id varchar(50) DEFAULT NULL,
  contact_number decimal(10,0) DEFAULT NULL,
  bussiness_nature varchar(50) DEFAULT NULL,
  bussiness_address_proof_url varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  assigned_vendor decimal(10,0) DEFAULT NULL,
  rejected_by varchar(10) DEFAULT NULL,
  rejected_reason varchar(50) DEFAULT NULL,
  narration varchar(100) DEFAULT NULL,
  service_type varchar(50) DEFAULT NULL,
  is_approved tinyint(1) DEFAULT '0',
  approved_by varchar(50) DEFAULT NULL,
  approved_date timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
);



DROP TABLE IF EXISTS gst_registration_partnership;
CREATE TABLE gst_registration_partnership (
	 id int NOT NULL AUTO_INCREMENT,
  partner_id decimal(10,0) DEFAULT NULL,
  id_partners json DEFAULT NULL,
  partnership_deep varchar(50) DEFAULT NULL,
  partner_name varchar(50) DEFAULT NULL,
  partner_pan_url varchar(255) DEFAULT NULL,
  partner_aadhar_url varchar(255) DEFAULT NULL,
  partner_photo_url varchar(255) DEFAULT NULL,
  partner_contact decimal(10,0) DEFAULT NULL,
  firm_pan_url varchar(255) DEFAULT NULL,
  bussiness_address_proof_url varchar(255) DEFAULT NULL,
  bank_acc_number decimal(20,0) DEFAULT NULL,
  bank_acc_name varchar(50) DEFAULT NULL,
  bank_ifsc_code varchar(20) DEFAULT NULL,
  gst_auth_partner_letter_url varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  assigned_vendor decimal(10,0) DEFAULT NULL,
  rejected_by varchar(10) DEFAULT NULL,
  rejected_reason varchar(50) DEFAULT NULL,
  narration varchar(100) DEFAULT NULL,
  service_type varchar(50) DEFAULT NULL,
  is_approved tinyint(1) DEFAULT '0',
  approved_by varchar(50) DEFAULT NULL,
  approved_date timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS gst_registration_company;
CREATE TABLE gst_registration_company (
   id int NOT NULL AUTO_INCREMENT,
  director_id decimal(10,0) DEFAULT NULL,
  articles_association_url varchar(255) DEFAULT NULL,
  moa_url varchar(255) DEFAULT NULL,
  company_certificate_url varchar(255) DEFAULT NULL,
  director_name varchar(50) DEFAULT NULL,
  director_din varchar(50) DEFAULT NULL,
  director_pan_url varchar(255) DEFAULT NULL,
  director_aadhar_url varchar(255) DEFAULT NULL,
  director_photo_url varchar(255) DEFAULT NULL,
  director_contact decimal(10,0) DEFAULT NULL,
  company_pan_url varchar(255) DEFAULT NULL,
  bussiness_address_proof_url varchar(255) DEFAULT NULL,
  bank_acc_number decimal(20,0) DEFAULT NULL,
  bank_acc_name varchar(50) DEFAULT NULL,
  bank_ifsc_code varchar(20) DEFAULT NULL,
  email varchar(50) DEFAULT NULL,
  bussiness_nature varchar(50) DEFAULT NULL,
  import_export_code varchar(50) DEFAULT NULL,
  gst_auth_director_letter_url varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  assigned_vendor decimal(10,0) DEFAULT NULL,
  rejected_by varchar(10) DEFAULT NULL,
  rejected_reason varchar(50) DEFAULT NULL,
  narration varchar(100) DEFAULT NULL,
  service_type varchar(50) DEFAULT NULL,
  is_approved tinyint(1) DEFAULT '0',
  approved_by varchar(50) DEFAULT NULL,
  approved_date timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS property_registration;
CREATE TABLE property_registration (
	id int NOT NULL AUTO_INCREMENT,
  sales_deed_url varchar(255) DEFAULT NULL,
  khata_certificate_url varchar(255) DEFAULT NULL,
  khata_extract_url varchar(255) DEFAULT NULL,
  property_tax_paid_reciept varchar(255) DEFAULT NULL,
  pan_card_url varchar(255) DEFAULT NULL,
  aadhar_url varchar(255) DEFAULT NULL,
  driving_lisence varchar(255) DEFAULT NULL,
  passport_url varchar(255) DEFAULT NULL,
  noc_url varchar(255) DEFAULT NULL,
  occupancy_url varchar(255) DEFAULT NULL,
  approved_building_plan varchar(255) DEFAULT NULL,
  power_of_attorny varchar(255) DEFAULT NULL,
  stamp_duty_url varchar(255) DEFAULT NULL,
  registration_fee_url varchar(255) DEFAULT NULL,
  assigned_vendor decimal(10,0) DEFAULT NULL,
  rejected_by varchar(10) DEFAULT NULL,
  rejected_reason varchar(50) DEFAULT NULL,
  narration varchar(100) DEFAULT NULL,
  service_type varchar(50) DEFAULT NULL,
  is_approved tinyint(1) DEFAULT '0',
  approved_by varchar(50) DEFAULT NULL,
  approved_date timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS rental_agreement;
CREATE TABLE rental_agreement (
	id int NOT NULL AUTO_INCREMENT,
  property_type varchar(100) DEFAULT NULL,
  porperty_address varchar(100) DEFAULT NULL,
  leaser_name varchar(100) DEFAULT NULL,
  leaser_aadhar_url varchar(255) DEFAULT NULL,
  leaser_pan_url varchar(255) DEFAULT NULL,
  leaser_contact decimal(10,0) DEFAULT NULL,
  tanant_name varchar(100) DEFAULT NULL,
  tenant_aadhar_url varchar(255) DEFAULT NULL,
  tenant_pan_url varchar(255) DEFAULT NULL,
  tenant_contact decimal(10,0) DEFAULT NULL,
  rental_start_date timestamp NULL DEFAULT NULL,
  rental_end_date timestamp NULL DEFAULT NULL,
  monthly_rent decimal(10,0) DEFAULT NULL,
  witness1_name varchar(100) DEFAULT NULL,
  witness1_aadhar_url varchar(255) DEFAULT NULL,
  witness1_contact decimal(10,0) DEFAULT NULL,
  witness2_name varchar(100) DEFAULT NULL,
  witness2_aadhar_url varchar(255) DEFAULT NULL,
  witness2_contact decimal(10,0) DEFAULT NULL,
  agreement_document_url varchar(255) DEFAULT NULL,
  stamp_duty_url varchar(255) DEFAULT NULL,
  registration_fee_url varchar(255) DEFAULT NULL,
  assigned_vendor decimal(10,0) DEFAULT NULL,
  rejected_by varchar(10) DEFAULT NULL,
  rejected_reason varchar(50) DEFAULT NULL,
  narration varchar(100) DEFAULT NULL,
  service_type varchar(50) DEFAULT NULL,
  is_approved tinyint(1) DEFAULT '0',
  approved_by varchar(50) DEFAULT NULL,
  approved_date timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- GIA CLASS RELATED
DROP TABLE IF EXISTS class_admins;
CREATE TABLE class_admins(
    admin_id int NOT NULL AUTO_INCREMENT,
  admin_mobile decimal(10,0) DEFAULT NULL,
  admin_name varchar(50) DEFAULT NULL,
  is_super_admin tinyint(1) DEFAULT '0',
  email varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (admin_id)
);

DROP TABLE IF EXISTS class_users;
CREATE TABLE class_users (
	  user_id int NOT NULL AUTO_INCREMENT,
  user_mobile decimal(10,0) DEFAULT NULL,
  user_name varchar(50) DEFAULT NULL,
  is_verified tinyint(1) DEFAULT '1',
  email varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  dob timestamp NULL DEFAULT NULL,
  course_of_study varchar(100) DEFAULT NULL,
  profile_image varchar(255) DEFAULT NULL,
  PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS boards;
CREATE TABLE boards (
	board_id int NOT NULL AUTO_INCREMENT,
  board_name varchar(50) DEFAULT NULL,
   free_course boolean default false,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  image_url varchar(255) DEFAULT NULL,
  PRIMARY KEY (board_id)
);

DROP TABLE IF EXISTS class;
CREATE TABLE class (
	class_id INT NOT NULL AUTO_INCREMENT,
     class_name varchar(50) DEFAULT NULL,
    class_created_by varchar(50) DEFAULT NULL,
	board_id int DEFAULT NULL,
  free_course boolean default false,
  price decimal(10,0) DEFAULT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     image_url varchar(255) DEFAULT NULL,
    PRIMARY KEY (class_id),
	FOREIGN KEY (board_id) REFERENCES boards(board_id)
);


DROP TABLE IF EXISTS subjects;
CREATE TABLE subjects (
	subject_id int NOT NULL AUTO_INCREMENT,
  subject_name varchar(50) DEFAULT NULL,
  subject_created_by varchar(50) DEFAULT NULL,
  created_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  price decimal(10,0) DEFAULT NULL,
  class_id int DEFAULT NULL,
  free_course boolean default false,
  image_url varchar(255) DEFAULT NULL,
  PRIMARY KEY (subject_id),

	FOREIGN KEY (class_id) REFERENCES class(class_id)
);

DROP TABLE IF EXISTS sub_subjects;
CREATE TABLE sub_subjects (
	sub_subject_id int NOT NULL AUTO_INCREMENT,
    sub_subject_name varchar(50) DEFAULT NULL,
    sub_subject_created_by varchar(50) DEFAULT NULL,
    free_course boolean default false,
    subject_id int DEFAULT NULL,
    sub_created_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    price decimal(10,0) DEFAULT NULL,
    image_url varchar(255) DEFAULT NULL,
    PRIMARY KEY (sub_subject_id),
	FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

DROP TABLE IF EXISTS chapters;
CREATE TABLE chapters (
    chapter_id INT NOT NULL AUTO_INCREMENT,
    chapter_name VARCHAR(50),
    chapter_created_by VARCHAR(50),
    serial_no VARCHAR(10),
    sub_subject_id INT DEFAULT NULL,
    subject_id INT DEFAULT NULL,
    description VARCHAR(255),
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    image_url VARCHAR(255),
    PRIMARY KEY (chapter_id),
    FOREIGN KEY (sub_subject_id) REFERENCES sub_subjects(sub_subject_id) ON DELETE SET NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE SET NULL
);

DROP TABLE IF EXISTS topics;
CREATE TABLE topics (

  topic_id int NOT NULL AUTO_INCREMENT,
  topic_name varchar(50) DEFAULT NULL,
  topic_created_by varchar(50) DEFAULT NULL,
  free_course boolean default false,
  chapter_id int DEFAULT NULL,
  qna json DEFAULT NULL,
  free_to_watch tinyint(1) DEFAULT '0',
  `description` varchar(255) DEFAULT NULL,
  created_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  video_url varchar(255) DEFAULT NULL,
  notes_url varchar(255) DEFAULT NULL,
  comments varchar(255) DEFAULT NULL,
  author varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `language` varchar(20) DEFAULT NULL,
  image_url varchar(255) DEFAULT NULL,
    PRIMARY KEY (topic_id),
    FOREIGN KEY (chapter_id) REFERENCES chapters(chapter_id)
);


DROP TABLE IF EXISTS about_subject;
CREATE TABLE about_subject (
  id int NOT NULL AUTO_INCREMENT,
  video_url varchar(255) DEFAULT NULL,
  notes_url varchar(255) DEFAULT NULL,
  comments varchar(255) DEFAULT NULL,
  author varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `language` varchar(20) DEFAULT NULL,
  topic_id int DEFAULT NULL,
  created_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(50) DEFAULT NULL,
  image_url varchar(255) DEFAULT NULL,
  sub_subject_id int DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);


DROP TABLE IF EXISTS users_class_purchased;
CREATE TABLE users_class_purchased(
	purchase_id int NOT NULL AUTO_INCREMENT,
    user_id int DEFAULT NULL,
    class_id int DEFAULT NULL,
    is_active tinyint(1) DEFAULT '0',
	PRIMARY KEY (purchase_id),
	FOREIGN KEY (user_id) REFERENCES class_users(user_id),
	FOREIGN KEY (class_id) REFERENCES class (class_id)
);


CREATE OR REPLACE VIEW boards_with_classes AS 
SELECT 
    b.board_id,
    b.board_name,
    b.created_at AS board_created_at,               
    c.class_id,
    c.class_name,
    c.free_course,
    c.class_created_by,
    c.price AS class_price,
    c.created_at AS class_created_at,
    c.image_url AS class_image_url  
FROM 
    boards b
LEFT JOIN 
    class c ON b.board_id = c.board_id;



CREATE VIEW subjects_with_class_and_boards AS
SELECT 
    s.subject_id,
    s.subject_name,
    s.subject_created_by,
    s.created_date AS subject_created_date,
    s.free_course,
    s.price AS subject_price,
    s.image_url as subject_image_url,
    c.class_id,
    c.class_name,
    c.class_created_by,
    c.price AS class_price,
    c.created_at AS class_created_at,
    b.board_id,
    b.board_name,
    b.created_at AS board_created_at
FROM 
    subjects s
LEFT JOIN 
    class c ON s.class_id = c.class_id
LEFT JOIN 
    boards b ON c.board_id = b.board_id;



CREATE or replace  VIEW sub_subjects_with_subject_class_boards AS
SELECT 
    ss.sub_subject_id,
    ss.sub_subject_name,
    ss.sub_subject_created_by,
    ss.sub_created_date AS sub_subject_created_date,
    ss.price AS sub_subject_price,
    ss.free_course,
    ss.image_url as sub_subject_image_url,
    s.subject_id,
    s.subject_name,
    s.subject_created_by,
    s.created_date AS subject_created_date,
    s.price AS subject_price,
    c.class_id,
    c.class_name,
    c.class_created_by,
    c.price AS class_price,
    c.created_at AS class_created_at,
    b.board_id,
    b.board_name,
    b.created_at AS board_created_at
FROM 
    sub_subjects ss
LEFT JOIN 
    subjects s ON ss.subject_id = s.subject_id
LEFT JOIN 
    class c ON s.class_id = c.class_id
LEFT JOIN 
    boards b ON c.board_id = b.board_id;



CREATE VIEW about_subject_with_all_details AS
SELECT 
    ab.id AS about_subject_id,
    ab.video_url,
    ab.notes_url,
    ab.comments,
    ab.author,
    ab.status,
    ab.language,
    ab.created_date AS about_subject_created_date,
    ab.created_by AS about_subject_created_by,
    ss.sub_subject_id,
    ss.sub_subject_name,
    ss.sub_subject_created_by,
    ss.sub_created_date AS sub_subject_created_date,
    ss.price AS sub_subject_price,
    s.subject_id,
    s.subject_name,
    s.subject_created_by,
    s.created_date AS subject_created_date,
    s.price AS subject_price,
    c.class_id,
    c.class_name,
    c.class_created_by,
    c.price AS class_price,
    c.created_at AS class_created_at,
    b.board_id,
    b.board_name,
    b.created_at AS board_created_at
FROM 
    about_subject ab 
LEFT JOIN 
    sub_subjects ss ON ab.sub_subject_id = ss.sub_subject_id
LEFT JOIN 
    subjects s ON ss.subject_id = s.subject_id
LEFT JOIN 
    class c ON s.class_id = c.class_id
LEFT JOIN 
    boards b ON c.board_id = b.board_id;



  CREATE VIEW users_class_purchased_with_all_details AS
SELECT 
    ucp.purchase_id,
    ucp.user_id,
    ucp.class_id,
    ucp.is_active,
    c.class_name,
    c.class_created_by,
    c.price AS class_price,
    c.created_at AS class_created_at,
    b.board_id,
    b.board_name,
    b.created_at AS board_created_at,
    s.subject_id,
    s.subject_name,
    s.subject_created_by,
    s.created_date AS subject_created_date,
    s.price AS subject_price,
    ss.sub_subject_id,
    ss.sub_subject_name,
    ss.sub_subject_created_by,
    ss.sub_created_date AS sub_subject_created_date,
    ss.price AS sub_subject_price,
    ab.id AS about_subject_id,
    ab.video_url,
    ab.notes_url,
    ab.comments,
    ab.author,
    ab.status,
    ab.language,
    ab.created_date AS about_subject_created_date,
    ab.created_by AS about_subject_created_by
FROM 
    users_class_purchased ucp
LEFT JOIN 
    class c ON ucp.class_id = c.class_id
LEFT JOIN 
    boards b ON c.board_id = b.board_id
LEFT JOIN 
    subjects s ON c.class_id = s.class_id
LEFT JOIN 
    sub_subjects ss ON s.subject_id = ss.subject_id
LEFT JOIN 
    about_subject ab ON ss.sub_subject_id = ab.sub_subject_id;


CREATE OR REPLACE VIEW view_chapters AS
SELECT 
    ch.chapter_id,
    ch.chapter_name,
    ch.serial_no,
    ch.chapter_created_by,
    ch.description AS chapter_description,
    ch.created_date AS chapter_created_date,
    ch.image_url as chapter_image_url,
    subsub.sub_subject_id,
    subsub.sub_subject_name,
    subsub.sub_subject_created_by,
    sub.subject_id,
    sub.subject_name,
    sub.subject_created_by,
    cls.class_id,
    cls.class_name,
    cls.class_created_by,
    brd.board_id,
    brd.board_name
FROM chapters ch
LEFT JOIN sub_subjects subsub ON ch.sub_subject_id = subsub.sub_subject_id
LEFT JOIN subjects sub ON COALESCE(ch.subject_id, subsub.subject_id) = sub.subject_id
LEFT JOIN class cls ON sub.class_id = cls.class_id
LEFT JOIN boards brd ON cls.board_id = brd.board_id;

CREATE OR REPLACE VIEW view_topics AS
SELECT 
    tp.topic_id,
    tp.topic_name,
    tp.topic_created_by,
    tp.qna,
    tp.free_to_watch,
    tp.free_course,  
    tp.description AS topic_description,
    tp.created_date AS topic_created_date,
    tp.video_url,
    tp.notes_url,
    tp.comments,
    tp.author,
    tp.status,
    tp.language,
    tp.image_url,
    ch.chapter_id,
    ch.chapter_name,
    ch.serial_no,
    ch.chapter_created_by,
    ch.description AS chapter_description,
    subsub.sub_subject_id,
    subsub.sub_subject_name,
    subsub.sub_subject_created_by,
    sub.subject_id,
    sub.subject_name,
    sub.subject_created_by,
    cls.class_id,
    cls.class_name,
    cls.class_created_by,
    brd.board_id,
    brd.board_name
FROM topics tp
INNER JOIN chapters ch ON tp.chapter_id = ch.chapter_id
LEFT JOIN sub_subjects subsub ON ch.sub_subject_id = subsub.sub_subject_id
LEFT JOIN subjects sub ON COALESCE(ch.subject_id, subsub.subject_id) = sub.subject_id
LEFT JOIN class cls ON sub.class_id = cls.class_id
LEFT JOIN boards brd ON cls.board_id = brd.board_id;



CREATE OR REPLACE VIEW view_about_subject AS
SELECT 
    ab.id AS about_subject_id,
    ab.video_url,
    ab.notes_url,
    ab.comments,
    ab.author,
    ab.status,
    ab.language,
    ab.created_date AS about_subject_created_date,
    ab.created_by AS about_subject_created_by,
    tp.topic_id,
    tp.topic_name,
    tp.free_to_watch,
    tp.description AS topic_description,
    ch.chapter_id,
    ch.chapter_name,
    ch.serial_no,
    ch.description AS chapter_description,
    subsub.sub_subject_id,
    subsub.sub_subject_name,
    sub.subject_id,
    sub.subject_name,
    cls.class_id,
    cls.class_name,
    brd.board_id,
    brd.board_name
FROM about_subject ab
INNER JOIN topics tp ON ab.topic_id = tp.topic_id
INNER JOIN chapters ch ON tp.chapter_id = ch.chapter_id
LEFT JOIN sub_subjects subsub ON ch.sub_subject_id = subsub.sub_subject_id
LEFT JOIN subjects sub ON COALESCE(ch.subject_id, subsub.subject_id) = sub.subject_id
LEFT JOIN class cls ON sub.class_id = cls.class_id
LEFT JOIN boards brd ON cls.board_id = brd.board_id;



CREATE TABLE flutterflirtformdat (
	id int NOT NULL AUTO_INCREMENT,
  phone decimal(10,0) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  location varchar(255) DEFAULT NULL,
  idea1 varchar(255) DEFAULT NULL,
  idea2 varchar(255) DEFAULT NULL,
	PRIMARY KEY (id)
);	

DROP TABLE IF EXISTS form_groups;
CREATE TABLE form_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS forms;
CREATE TABLE forms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    group_id  INT,
    fields JSON NOT NULL,
    form_name varchar(100) DEFAULT NULL,
    FOREIGN KEY (group_id) REFERENCES form_groups(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS responses;
CREATE TABLE responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id INT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    responses JSON NOT NULL,
    FOREIGN KEY (form_id) REFERENCES forms(id) 
);


-- 668-866

DROP TABLE IF EXISTS gstregistration;
CREATE TABLE gstregistration(

	 id int NOT NULL AUTO_INCREMENT,
  pan_no varchar(50) DEFAULT NULL,
  registration_certificate_url varchar(255) DEFAULT NULL,
  electricity_bill_url varchar(255) DEFAULT NULL,
  rental_agreement_url varchar(255) DEFAULT NULL,
  director_photo_url varchar(255) DEFAULT NULL,
  director_pan_url varchar(255) DEFAULT NULL,
  director_aadhar_url varchar(255) DEFAULT NULL,
  vendor_id int DEFAULT NULL,
  user_enquiry_date_time timestamp NULL DEFAULT NULL,
  admin_accepted_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_reason varchar(255) DEFAULT NULL,
  admin_accepted_or_rejected_by int DEFAULT NULL,
  assigned_vendor_id int DEFAULT NULL,
  assigned_vendor_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_date_time timestamp NULL DEFAULT NULL,
  vendor_rejected_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_or_rejected_by int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  vendor_rejected_reason varchar(255) DEFAULT NULL,
  vendor_completed_date_time timestamp NULL DEFAULT NULL,
  qNa json DEFAULT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS panRegistration;
CREATE TABLE panRegistration(
	id int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  photo_url varchar(255) DEFAULT NULL,
  aadhar_url varchar(255) DEFAULT NULL,
  residental_proof_url varchar(255) DEFAULT NULL,
  bank_statement_url varchar(255) DEFAULT NULL,
  vendor_id int DEFAULT NULL,
  user_enquiry_date_time timestamp NULL DEFAULT NULL,
  admin_accepted_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_reason varchar(255) DEFAULT NULL,
  admin_accepted_or_rejected_by int DEFAULT NULL,
  assigned_vendor_id int DEFAULT NULL,
  assigned_vendor_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_date_time timestamp NULL DEFAULT NULL,
  vendor_rejected_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_or_rejected_by int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  vendor_rejected_reason varchar(255) DEFAULT NULL,
  vendor_completed_date_time timestamp NULL DEFAULT NULL,
  qNa json DEFAULT NULL,
   PRIMARY KEY (id)

);

DROP TABLE IF EXISTS tanApplication;
CREATE TABLE tanApplication(
	id int NOT NULL AUTO_INCREMENT,
  pan_url varchar(255) DEFAULT NULL,
  authorised_signatory_url varchar(255) DEFAULT NULL,
  dsc_url varchar(255) DEFAULT NULL,
  vendor_id int DEFAULT NULL,
  user_enquiry_date_time timestamp NULL DEFAULT NULL,
  admin_accepted_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_reason varchar(255) DEFAULT NULL,
  admin_accepted_or_rejected_by int DEFAULT NULL,
  assigned_vendor_id int DEFAULT NULL,
  assigned_vendor_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_date_time timestamp NULL DEFAULT NULL,
  vendor_rejected_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_or_rejected_by int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  vendor_rejected_reason varchar(255) DEFAULT NULL,
  vendor_completed_date_time timestamp NULL DEFAULT NULL,
  qNa json DEFAULT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS tdsreturn;
CREATE TABLE tdsreturn(
	id int NOT NULL AUTO_INCREMENT,
  tds_statement_url varchar(255) DEFAULT NULL,
  any_statement_id varchar(255) DEFAULT NULL,
  vendor_id int DEFAULT NULL,
  user_enquiry_date_time timestamp NULL DEFAULT NULL,
  admin_accepted_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_reason varchar(255) DEFAULT NULL,
  admin_accepted_or_rejected_by int DEFAULT NULL,
  assigned_vendor_id int DEFAULT NULL,
  assigned_vendor_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_date_time timestamp NULL DEFAULT NULL,
  vendor_rejected_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_or_rejected_by int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  vendor_rejected_reason varchar(255) DEFAULT NULL,
  vendor_completed_date_time timestamp NULL DEFAULT NULL,
  qNa json DEFAULT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS legalNotice;
CREATE TABLE legalNotice(
	id int NOT NULL AUTO_INCREMENT,
  first_person_details varchar(255) DEFAULT NULL,
  second_person_details varchar(255) DEFAULT NULL,
  vendor_id int DEFAULT NULL,
  user_enquiry_date_time timestamp NULL DEFAULT NULL,
  admin_accepted_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_reason varchar(255) DEFAULT NULL,
  admin_accepted_or_rejected_by int DEFAULT NULL,
  assigned_vendor_id int DEFAULT NULL,
  assigned_vendor_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_date_time timestamp NULL DEFAULT NULL,
  vendor_rejected_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_or_rejected_by int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  vendor_rejected_reason varchar(255) DEFAULT NULL,
  vendor_completed_date_time timestamp NULL DEFAULT NULL,
  qNa json DEFAULT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS saleAggrement;
CREATE TABLE saleAggrement(
	id int NOT NULL AUTO_INCREMENT,
  purchaser_details varchar(255) DEFAULT NULL,
  seller_details varchar(255) DEFAULT NULL,
  sale_amount decimal(10,0) DEFAULT NULL,
  advance_received decimal(10,0) DEFAULT NULL,
  vendor_id int DEFAULT NULL,
  user_enquiry_date_time timestamp NULL DEFAULT NULL,
  admin_accepted_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_reason varchar(255) DEFAULT NULL,
  admin_accepted_or_rejected_by int DEFAULT NULL,
  assigned_vendor_id int DEFAULT NULL,
  assigned_vendor_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_date_time timestamp NULL DEFAULT NULL,
  vendor_rejected_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_or_rejected_by int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  vendor_rejected_reason varchar(255) DEFAULT NULL,
  vendor_completed_date_time timestamp NULL DEFAULT NULL,
  qNa json DEFAULT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS saledeed;
CREATE TABLE saledeed(

	id int NOT NULL AUTO_INCREMENT,
  purchaser_details varchar(255) DEFAULT NULL,
  seller_details varchar(255) DEFAULT NULL,
  sale_amount decimal(10,0) DEFAULT NULL,
  advance_received decimal(10,0) DEFAULT NULL,
  tax_receipt_URL varchar(255) DEFAULT NULL,
  vendor_id int DEFAULT NULL,
  user_enquiry_date_time timestamp NULL DEFAULT NULL,
  admin_accepted_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_reason varchar(255) DEFAULT NULL,
  admin_accepted_or_rejected_by int DEFAULT NULL,
  assigned_vendor_id int DEFAULT NULL,
  assigned_vendor_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_date_time timestamp NULL DEFAULT NULL,
  vendor_rejected_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_or_rejected_by int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  vendor_rejected_reason varchar(255) DEFAULT NULL,
  vendor_completed_date_time timestamp NULL DEFAULT NULL,
  qNa json DEFAULT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS affidavid;
CREATE TABLE affidavid(
	id int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  age decimal(5,0) DEFAULT NULL,
  address varchar(255) DEFAULT NULL,
  details varchar(255) DEFAULT NULL,
  vendor_id int DEFAULT NULL,
  user_enquiry_date_time timestamp NULL DEFAULT NULL,
  admin_accepted_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_date_time timestamp NULL DEFAULT NULL,
  admin_rejected_reason varchar(255) DEFAULT NULL,
  admin_accepted_or_rejected_by int DEFAULT NULL,
  assigned_vendor_id int DEFAULT NULL,
  assigned_vendor_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_date_time timestamp NULL DEFAULT NULL,
  vendor_rejected_date_time timestamp NULL DEFAULT NULL,
  vendor_accepted_or_rejected_by int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  vendor_rejected_reason varchar(255) DEFAULT NULL,
  vendor_completed_date_time timestamp NULL DEFAULT NULL,
  qNa json DEFAULT NULL,

    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
    id int NOT NULL AUTO_INCREMENT,
  user_name varchar(100) DEFAULT NULL,
  user_id int NOT NULL,
  rating decimal(2,0) DEFAULT NULL,
  review_comment varchar(255) DEFAULT NULL,
  topic_id int DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


DROP TABLE IF EXISTS qna;
CREATE TABLE qna (
question_id int NOT NULL AUTO_INCREMENT,
  user_id int DEFAULT NULL,
  topic_id int DEFAULT NULL,
  questionanswers json DEFAULT NULL,
  posted_date timestamp NULL DEFAULT NULL,
PRIMARY KEY (question_id),
FOREIGN KEY (user_id) REFERENCES class_users(user_id),
FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);



-- User Favorites Table
DROP TABLE IF EXISTS user_favorites;
CREATE TABLE user_favorites (
   favorite_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
 
  subject_id int NOT NULL,
  added_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (favorite_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
);

-- classuser_favorites

DROP TABLE IF EXISTS classuser_favorites;
CREATE TABLE classuser_favorites (
   favorite_id int NOT NULL AUTO_INCREMENT,
   user_id int NOT NULL,
   subject_id int NOT NULL,
   added_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (favorite_id),
   FOREIGN KEY (user_id) REFERENCES class_users(user_id) ON DELETE CASCADE,
   FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
);


CREATE OR REPLACE VIEW qna_view AS
SELECT qna.question_id, qna.topic_id, qna.user_id, qna.posted_date, qna.questionanswers, class_users.user_name, topics.topic_name
 FROM qna INNER JOIN class_users ON class_users.user_id = qna.user_id 
 INNER JOIN topics ON topics.topic_id = qna.topic_id;


 DROP TABLE IF EXISTS cart_header;
 CREATE TABLE cart_header (
 cart_id int NOT NULL AUTO_INCREMENT,
  user_id int DEFAULT NULL,
  cart_amount decimal(10,0) DEFAULT NULL,
 created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (cart_id),
 FOREIGN KEY (user_id) REFERENCES class_users(user_id)
 );
 

 
 DROP TABLE IF EXISTS cart_items;
 CREATE TABLE cart_items (
   item_id int NOT NULL AUTO_INCREMENT,
  cart_id int DEFAULT NULL,
  class_id int DEFAULT NULL,
  class_price decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (item_id),
 FOREIGN KEY (cart_id) REFERENCES cart_header(cart_id)
 );


DROP TABLE IF EXISTS payment_hsitory;
CREATE TABLE payment_hsitory (
     payment_id int NOT NULL AUTO_INCREMENT,
  user_id int DEFAULT NULL,
  payment_amount decimal(5,0) DEFAULT NULL,
  razorpay_trans_id varchar(255) DEFAULT NULL,
  payment_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  payment_status tinyint(1) DEFAULT NULL,
  PRIMARY KEY (payment_id),
    FOREIGN KEY (user_id) REFERENCES class_users (user_id)
);

DROP TABLE IF EXISTS subjects_purchased;
CREATE TABLE subjects_purchased (
    purchase_id int NOT NULL AUTO_INCREMENT,
  user_id int DEFAULT NULL,
  subject_id int DEFAULT NULL,
  PRIMARY KEY (purchase_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

-- CREATE OR REPLACE VIEW  form_response_view AS
-- SELECT responses.id, responses.form_id, responses.responses, forms.form_name
--  FROM responses INNER JOIN forms ON forms.id = responses.form_id;
-- CREATE OR REPLACE VIEW form_response_view AS
-- SELECT 
--     responses.id, 
--     responses.form_id, 
--     responses.responses, 
--     forms.name AS form_name
-- FROM 
--     responses
-- INNER JOIN 
--     forms 
-- ON 
--     forms.id = responses.form_id;


CREATE OR REPLACE VIEW form_response_view AS
SELECT 
    responses.id, 
    responses.form_id, 
    responses.user_name,
    responses.phone_number,
    responses.responses, 
    forms.name AS form_name
FROM 
    responses
INNER JOIN 
    forms 
ON 
    forms.id = responses.form_id;


DROP TABLE IF EXISTS USER_CART;
CREATE TABLE USER_CART (
    cart_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    subject_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (cart_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
    
);




 

CREATE OR REPLACE VIEW get_new_cart_id AS
SELECT IFNULL(MAX(cart_id) + 1, 1) AS new_cart_id
FROM cart_header;


CREATE OR REPLACE VIEW subjects_purchased_view AS
SELECT 
    sp.purchase_id,
    sp.user_id,
    sp.subject_id,
    s.subject_name,
    s.subject_created_by,
    s.created_date AS subject_created_date,
    s.price AS subject_price,
    s.image_url AS subject_image_url,
    c.class_id,
    c.class_name,
    c.class_created_by,
    c.price AS class_price,
    c.image_url AS class_image_url,
    b.board_id,
    b.board_name,
    b.image_url AS board_image_url,
    b.created_at AS board_created_date
FROM 
    subjects_purchased sp
INNER JOIN 
    subjects s ON sp.subject_id = s.subject_id
INNER JOIN 
    class c ON s.class_id = c.class_id
INNER JOIN 
    boards b ON c.board_id = b.board_id;


--  testomonials.....
 DROP TABLE IF EXISTS testimonial;
    CREATE TABLE testimonial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    -- designation VARCHAR(255) NOT NULL,
    image_url varchar(255) DEFAULT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


