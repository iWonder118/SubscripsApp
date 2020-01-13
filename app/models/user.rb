class User < ApplicationRecord
	# Include default devise modules. Others available are:
	# :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
	devise :database_authenticatable, :registerable,
				:recoverable, :rememberable, :validatable

	has_many :items, dependent: :destroy

	VALID_EMAIL_REGEX    = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	VALID_PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]+\z/i

	validates :name,                  presence: true, length: { in: 3..20 } 
	validates :email,                 presence: true, format: { with: VALID_EMAIL_REGEX,    message: "は@を含む形式にしてください" }, uniqueness: true
	validates :password,              presence: true, format: { with: VALID_PASSWORD_REGEX, message: "は英字と数字両方を含むパスワードを設定してください" },
																		length: { in: 8..72 }, confirmation: true
	validates :password_confirmation, presence: true, format: { with: VALID_PASSWORD_REGEX, message: "は英字と数字両方を含むパスワードを設定してください" },
																		length: { in: 8..72 }
end
