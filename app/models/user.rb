class User < ApplicationRecord
  has_secure_password validations: true
  validates :name,                  presence: true
  validates :email,                 presence: true, uniqueness: true
  validates :password,              presence: true
  validates :password_confirmation, presence: true

  def self.new_remember_token
    SecureRandom.urlsafe_base64
  end

  def self.encrypt(token)
    Digest::SHA256.hexdigest(token.to_s)
  end
end
