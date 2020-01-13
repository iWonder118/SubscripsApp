class RenamePublicCulumnToItems < ActiveRecord::Migration[5.2]
  def change
    rename_column :items, :public, :release
  end
end
