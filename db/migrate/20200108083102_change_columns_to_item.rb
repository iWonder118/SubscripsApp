class ChangeColumnsToItem < ActiveRecord::Migration[5.2]
  def change
    add_column           :items, :plan,        :string, null: false
    add_column           :items, :color,       :string, null: false
    remove_column        :items, :description, :text
  end
end
