class Item < ApplicationRecord
  has_one :payment, dependent: :destroy

  belongs_to :user
  
  accepts_nested_attributes_for :payment

  validates :title,   presence: true, length: { in: 3..40 } 
  validates :link,    presence: true
  validates :color,   presence: true
  validates :plan,    presence: true, length: { in: 3..40 } 
  validates :price,   presence: true, numericality: true, length: { in: 100..1000000 } 
  validates :private, acceptance: true
end
