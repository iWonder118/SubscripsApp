FactoryBot.define do
  pass = Faker::Internet.password(11)
  factory :user do
    name                  Faker::Name.name
    email                 Faker::Internet.email
    password              pass
    password_confirmation pass
  end
end