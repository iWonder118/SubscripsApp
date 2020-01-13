class Payment < ApplicationRecord
  belongs_to :item

  validates :period_long,   presence: true
  validates :period_unit,   presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 3}
  validates :first_payment, presence: true
end
