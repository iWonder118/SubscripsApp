require 'rails_helper'

describe User do
  describe '#create' do
    it "全ての値が適切に入力されている場合、登録できること" do
      user = build(:user)
      expect(user).to be_valid
    end

    it "nameが空の場合、登録できないこと" do
      user = build(:user, name: "")
      user.valid?
      expect(user.errors[:name]).to include("を入力してください")
    end

    it "nameが2文字以下のとき、登録できないこと" do
      user = build(:user, name: "11")
      user.valid?
      expect(user.errors[:name]).to include("は3文字以上で入力してください")
    end

    it "nameが21文字以上のとき、登録できないこと" do
      user = build(:user, name: "111111111111111111111")
      user.valid?
      expect(user.errors[:name]).to include("は20文字以内で入力してください")
    end

    it "emailが空の場合、登録できないこと" do
      user = build(:user, email: "")
      user.valid?
      expect(user.errors[:email]).to include("を入力してください")
    end

    it "emailの中間に@がない場合、登録できないこと" do
      user = build(:user, email: "email")
      user.valid?
      expect(user.errors[:email]).to include("は@を含む形式にしてください")
    end

    it "emailが登録済みの場合、登録できないこと" do
      user = create(:user)
      another_user = build(:user, email: user.email)
      another_user.valid?
      expect(another_user.errors[:email]).to include("はすでに存在します")
    end

    it "passwordが空の場合、登録できないこと" do
      user = build(:user, password: "", password_confirmation: "")
      user.valid?
      expect(user.errors[:password]).to include("を入力してください")
    end

    it "passwordが7文字以下の場合、登録できないこと" do
      user = build(:user, password: "12345qw", password_confirmation: "12345qw")
      user.valid?
      expect(user.errors[:password]).to include("8文字以上で入力してください", "は英字と数字両方を含むパスワードを設定してください")
    end

    it "passwordが129文字以上の場合、登録できないこと" do
      o = [('a'..'z'), ('A'..'Z'), ('0'..'9')].map(&:to_a).flatten
      password = (0...129).map { o[rand(o.length)] }.join
      user = build(:user, password: password.to_s, password_confirmation: password.to_s)
      user.valid?
      expect(user.errors[:password]).to include("は128文字以内で入力してください")
    end

    it "passwordが数字のみの場合、登録できないこと" do
      user = build(:user, password: "12345678", password_confirmation: "12345678")
      user.valid?
      expect(user.errors[:password]).to include("は英字と数字両方を含むパスワードを設定してください")
    end

    it "passwordが英字のみの場合、登録できないこと" do
      user = build(:user, password: "abcdefgh", password_confirmation: "abcdefgh")
      user.valid?
      expect(user.errors[:password]).to include("は英字と数字両方を含むパスワードを設定してください")
    end

    it "passwordが数字と英字を含む8文字の場合、登録できること" do
      user = build(:user, password: "1a2b3c4e", password_confirmation: "1a2b3c4e")
      expect(user).to be_valid
    end

    it "passwordが数字と英字を含む128文字の場合、登録できること" do
      o = [('a'..'z'), ('A'..'Z'), ('0'..'9')].map(&:to_a).flatten
      password = (0...128).map { o[rand(o.length)] }.join
      user = build(:user, password: password.to_s, password_confirmation: password.to_s)
      expect(user).to be_valid
    end

    it "passwordと_confirmationが一致しない場合、登録できないこと" do
      user = build(:user, password: "1a2b3c4e", password_confirmation: "1a2b3c3e")
      user.valid?
      expect(user.errors[:password_confirmation]).to include("とパスワードの入力が一致しません")
    end

  end
end