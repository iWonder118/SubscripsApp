FactoryBot.define do
  factory :user do
    pass = Faker::Internet.password(min_length: 8)

    name                  {Faker::Name.name}
    email                 {Faker::Internet.email}
    password              {pass}
    password_confirmation {pass}
  end
end