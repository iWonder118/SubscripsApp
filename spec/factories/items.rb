FactoryBot.define do
  factory :item, class: Item do
    title   {"Amazon Prime"}
    link    {"https://www.amazon.co.jp/gp/prime/pipeline/signup?showLandingPage=1&renderingType=mobile&primeCampaignId=primeMobileSignupWhite"}
    color   {"orange"}
    plan    {"student"}
    price   {250}
    release  {1}
    row_order_position  {1}
    association      :user, factory: :user

    after(:build) do |item|
      item.payment = build(:payment, item: item)
    end
  end

  factory :item_no_payment, class: Item do
    title   {"Amazon Prime"}
    link    {"https://www.amazon.co.jp/gp/prime/pipeline/signup?showLandingPage=1&renderingType=mobile&primeCampaignId=primeMobileSignupWhite"}
    color   {"orange"}
    plan    {"student"}
    price   {250}
    release  {1}
    row_order_position  {1}
    association      :user, factory: :user
  end
end