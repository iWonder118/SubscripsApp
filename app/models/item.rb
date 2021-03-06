class Item < ApplicationRecord
  has_one :payment, dependent: :destroy

  belongs_to :user
  
  include RankedModel
  ranks :row_order, with_same: :user_id 

  accepts_nested_attributes_for :payment

  validates :payment , presence: true

  validates :title,   presence: true, length: { in: 3..40 } 
  validates :link,    presence: true
  validates :color,   presence: true
  validates :plan,    presence: true, length: { in: 3..40 } 
  validates :price,   presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 100, less_than_or_equal_to: 1000000}
  validates :release, inclusion: {in: [true, false]}

  def amount_per_day
    now = Date.current
    now_month_days = now.end_of_month - now.beginning_of_month + 1
    days_fee = self.price.to_i / now_month_days.to_i
  end
end
