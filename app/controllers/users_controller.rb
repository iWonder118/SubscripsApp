class UsersController < ApplicationController
  # ログイン済ユーザーのみにアクセスを許可する
  before_action :authenticate_user!
  def show
    
  end
end