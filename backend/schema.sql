CREATE DATABASE IF NOT EXISTS referral_db;

USE referral_db;

CREATE TABLE IF NOT EXISTS referral_gpt_response (
  id INT AUTO_INCREMENT PRIMARY KEY,
  referral_email VARCHAR(100) NOT NULL UNIQUE,
  referral_name VARCHAR(100) NOT NULL,
  gpt_fit_answer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
