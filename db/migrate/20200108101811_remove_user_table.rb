class RemoveUserTable < ActiveRecord::Migration[5.2]
  def change
    remove_reference     :items, :user,        foreign_key: true, index: true
    drop_table :users
  end
end
