require 'rails_helper'

describe Item, type: :model do
  describe "#create" do
    before do
      @user            = build(:user)
      @item            = build(:item)
      @item_no_payment = build(:item_no_payment)
    end

    it "全ての値が適切に入力されている場合、登録できること" do
      item = @item
      expect(item).to be_valid
    end

    it "Paymentフォームが入力されていない場合、登録できないこと" do
      item_no_payment = @item_no_payment
      item_no_payment.valid?
      expect(item_no_payment.errors[:payment]).to include("を入力してください")
    end

    it "titleが入力されていない場合、登録できないこと" do
      item = build(:item, title: "")
      item.valid?
      expect(item.errors[:title]).to include("を入力してください")
    end

    it "titleが入力されていない場合、登録できないこと" do
      item = build(:item, title: "")
      item.valid?
      expect(item.errors[:title]).to include("を入力してください")
    end
    it "titleが３文字以下の場合、登録できないこと" do
      item = build(:item, title: "ab")
      item.valid?
      expect(item.errors[:title]).to include("は3文字以上で入力してください")
    end

    it "titleが40文字以上の場合、登録できないこと" do
      o = [('a'..'z'), ('A'..'Z'), ('0'..'9')].map(&:to_a).flatten
      title = (0...41).map { o[rand(o.length)] }.join
      item = build(:item, title: title.to_s)
      item.valid?
      expect(item.errors[:title]).to include("は40文字以内で入力してください")
    end

  end
end