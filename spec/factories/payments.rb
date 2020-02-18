FactoryBot.define do
  factory :payment, class: Payment do
    period_long   {1}
    period_unit   {1}
    first_payment {"2020-1-1"}
    pay_method    {"Card"}
    description   {"test"}

    association  :item, factory: :item
  end
end
