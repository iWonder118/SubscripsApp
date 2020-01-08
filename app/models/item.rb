class Item < ApplicationRecord
  has_one :payment, dependent: :destroy

  belongs_to :user
  
  accepts_nested_attributes_for :payment
end
