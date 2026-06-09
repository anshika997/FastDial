-- ============================================================
--  FastDial Chat Schema
--  Tables used in chatRoutes.js + chatController.js
--  Engine: MySQL / InnoDB
-- ============================================================

USE fastdial;

-- ============================================================
-- 1. chat_room
--    Ek unique room per vendor-customer pair
--    Referenced by: POST /get-room
-- ============================================================
CREATE TABLE IF NOT EXISTS chat_room (
  chat_room_id  INT       AUTO_INCREMENT PRIMARY KEY,
  vendor_id     INT       NOT NULL,
  customer_id   INT       NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_room (vendor_id, customer_id),
  FOREIGN KEY (vendor_id)   REFERENCES VENDORS(vendor_id)     ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES CUSTOMERS(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ============================================================
-- 2. messages
--    Saare chat messages store hote hain yahan
--    Referenced by: GET /messages/:chat_room_id, saveMessage (Socket.IO)
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  message_id    INT          AUTO_INCREMENT PRIMARY KEY,
  chat_room_id  INT          NOT NULL,
  sender_type   ENUM('customer','vendor') NOT NULL,
  sender_id     INT          NOT NULL,
  message       TEXT         NOT NULL,
  sent_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chat_room_id) REFERENCES chat_room(chat_room_id) ON DELETE CASCADE
) ENGINE=InnoDB;
