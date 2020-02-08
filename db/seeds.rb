# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
['音楽', '動画', '書籍', 'ゲーム', 'アプリ', '食料・飲料', '衣服', '美容', '雑貨', 'その他'
].each do |name|
  Category.create!(name: name)
end 