class Category < ApplicationRecord
  has_many :categories_articles, dependent: :destroy
  has_many :items,  through: :categories_articles, dependent: :destroy
end
