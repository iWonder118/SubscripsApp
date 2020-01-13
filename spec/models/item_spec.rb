require 'rails_helper'

describe Item, type: :model do
  describe "#create" do
    before do
      @user            = build(:user)
      @item            = build(:item )
      @item_no_payment = build(:item_no_payment)
    end

    it "全ての値が適切に入力されている場合、登録できること" do
      item = @item
      expect(item).to be_valid
    end
  end
end