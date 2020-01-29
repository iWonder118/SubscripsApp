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
      item = build(:item, title: nil)
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

    it "linkが入力されていない場合、登録できないこと" do
      item = build(:item, link: nil)
      item.valid?
      expect(item.errors[:link]).to include("を入力してください")
    end

    it "colorが入力されていない場合、登録できないこと" do
      item = build(:item, color: nil)
      item.valid?
      expect(item.errors[:color]).to include("を入力してください")
    end

    it "planが入力されていない場合、登録できないこと" do
      item = build(:item, plan: nil)
      item.valid?
      expect(item.errors[:plan]).to include("を入力してください")
    end

    it "planが３文字以下の場合、登録できないこと" do
      item = build(:item, plan: "ab")
      item.valid?
      expect(item.errors[:plan]).to include("は3文字以上で入力してください")
    end

    it "planが40文字以上の場合、登録できないこと" do
      o = [('a'..'z'), ('A'..'Z'), ('0'..'9')].map(&:to_a).flatten
      plan = (0...41).map { o[rand(o.length)] }.join
      item = build(:item, plan: plan.to_s)
      item.valid?
      expect(item.errors[:plan]).to include("は40文字以内で入力してください")
    end

    it "priceが整数以外の場合、登録できないこと" do
      item = build(:item, price: "ああああ")
      item.valid?
      expect(item.errors[:price]).to include("は数値で入力してください")
    end

    it "priceが入力されていない場合、登録できないこと" do
      item = build(:item, price: nil)
      item.valid?
      expect(item.errors[:price]).to include("を入力してください")
    end

    it "priceが100未満の場合、登録できないこと" do
      item = build(:item, price: 99)
      item.valid?
      expect(item.errors[:price]).to include("は100以上の値にしてください")
    end

    it "priceが1000000より大きい場合、登録できないこと" do
      item = build(:item, price: 10000001)
      item.valid?
      expect(item.errors[:price]).to include("は1000000以下の値にしてください")
    end

    it "row_orderが整数以外の場合、登録できないこと" do
      item = build(:item, row_order: "ああああ")
      item.valid?
      expect(item.errors[:row_order]).to include("は数値で入力してください")
    end

    it "period_longが未入力の場合、登録できないこと" do
      item = build(:item)
      item.payment = build(:payment, period_long: nil)
      item.payment.valid?
      expect(item.payment.errors[:period_long]).to include("を入力してください")
    end

    it "period_unitが未入力の場合、登録できないこと" do
      item = build(:item)
      item.payment = build(:payment, period_unit: nil)
      item.payment.valid?
      expect(item.payment.errors[:period_unit]).to include("を入力してください")
    end

    it "period_unitが1未満の場合、登録できないこと" do
      item = build(:item)
      item.payment = build(:payment, period_unit: 0)
      item.payment.valid?
      expect(item.payment.errors[:period_unit]).to include("は1以上の値にしてください")
    end

    it "period_unitが1000000より大きい場合、登録できないこと" do
      item = build(:item)
      item.payment = build(:payment, period_unit: 4)
      item.payment.valid?
      expect(item.payment.errors[:period_unit]).to include("は3以下の値にしてください")
    end

    it "first_paymentが未入力の場合、登録できないこと" do
      item = build(:item)
      item.payment = build(:payment, first_payment: nil)
      item.payment.valid?
      expect(item.payment.errors[:first_payment]).to include("を入力してください")
    end
  end
end