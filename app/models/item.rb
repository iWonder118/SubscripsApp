class Item < ApplicationRecord
  has_one  :user
  has_one  :payment, dependent: :destroy
  accepts_nested_attributes_for :payment
end
