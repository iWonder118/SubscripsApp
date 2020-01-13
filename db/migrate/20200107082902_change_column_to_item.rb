class ChangeColumnToItem < ActiveRecord::Migration[5.2]
  def change
    add_column        :items, :link,        :text
    add_column        :items, :description, :text
    add_column        :items, :price,       :string,           null: false
    add_column        :items, :private,     :boolean,          default: false,    null: false
    add_reference     :items, :user,        foreign_key: true, index: true
  end

  def up
    change_column :items, :title,       :string,     null: false,      limit: 40 
  end

  def down
    change_column :items, :title,       :string
  end
end
