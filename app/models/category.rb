class Category < ApplicationRecord
  has_many :categories_articles
  has_many :items,  through: :categories_articles
end
