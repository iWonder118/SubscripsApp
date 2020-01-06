require 'rails_helper'

describe User do
  describe '#create' do

    it "nameカラムが空の場合、登録できないこと" do
      user = build(:user, name: "")
      user.valid?
      expect(user.errors[:name]).to include("を入力してください")
    end

    it "emailカラムが空の場合、登録できないこと" do
      user = build(:user, email: "")
      user.valid?
      expect(user.errors[:email]).to include("を入力してください")
    end

  end
end