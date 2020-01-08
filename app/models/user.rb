class User < ApplicationRecord
  has_many :items, dependent: :destroy

  has_secure_password validations: true

  VALID_EMAIL_REGEX    = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  VALID_PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]+\z/i

  validates :name,                  presence: true, length: { in: 3..20 } 
  validates :email,                 presence: true, format: { with: VALID_EMAIL_REGEX,    message: "は@を含む形式にしてください" }, uniqueness: true
  validates :password,              presence: true, format: { with: VALID_PASSWORD_REGEX, message: "は英字と数字両方を含むパスワードを設定してください" },
                                    length: { in: 8..72 }, confirmation: true
  validates :password_confirmation, presence: true, format: { with: VALID_PASSWORD_REGEX, message: "は英字と数字両方を含むパスワードを設定してください" },
                                    length: { in: 8..72 }

  def self.new_remember_token
    SecureRandom.urlsafe_base64
  end

  def self.encrypt(token)
    Digest::SHA256.hexdigest(token.to_s)
  end
end
