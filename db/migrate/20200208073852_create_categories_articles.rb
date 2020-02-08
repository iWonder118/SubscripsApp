class CreateCategoriesArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :categories_articles do |t|
      t.references :item    , foreign_key: true, index: true
      t.references :category, foreign_key: true, index: true
    end
  end
end
