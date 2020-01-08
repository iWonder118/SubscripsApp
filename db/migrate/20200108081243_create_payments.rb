class CreatePayments < ActiveRecord::Migration[5.2]
  def change
    create_table :payments do |t|
      t.integer    :period_long,   null: false
      t.integer    :period_unit,   null: false
      t.date       :first_payment, null: false
      t.string     :pay_method,    default: ""
      t.text       :description
      t.references :item,          foreign_key: true
      t.timestamps
    end
  end
end
