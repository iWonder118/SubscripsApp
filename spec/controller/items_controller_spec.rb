require 'rails_helper'

describe ItemsController, type: :controller do 

  let(:user) { create(:user) }

  describe 'GET #index' do 
    context "ユーザーがログインしている場合" do

      before do
        # controller_macros.rb内のlogin_userメソッドを呼び出し
        login_user user
      end
      
      it "indexのレスポンスを返すこと" do 
        get :index 
        expect(response).to be_success 
      end

      it "200レスポンスを返すこと" do
        get :index
        expect(response).to have_http_status"200"
      end

    end
    context "ユーザーがログインしていない場合" do

      it "indexのレスポンスを返さないこと" do 
        get :index 
        expect(response).to redirect_to new_user_session_path
      end
    end
  end

  describe 'GET #show' do 
    context "サービス情報が公開になっている場合" do

      before do
        # controller_macros.rb内のlogin_userメソッドを呼び出し
        login_user user
        @item = create(:item)
        get :show, params: {user_id: user.id, id: @item.id}
      end
      
      it "showのレスポンスを返すこと" do 
        expect(response).to be_success 
      end

      it "200レスポンスを返すこと" do
        expect(response).to have_http_status"200"
      end

    end
    context "サービス情報が非公開になっている場合" do

      it "showのレスポンスを返えすこと" do 
        expect(response).to be_success 
      end

      it "200レスポンスを返すこと" do
        expect(response).to have_http_status"200"
      end
    end
  end
end