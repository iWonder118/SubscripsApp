Rails.application.routes.draw do
    #  ユーザ管理機能のルート
  devise_for :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'items#index'
  resources :items, only: [:index, :create]

  # ヘルスチェック用の routes を設定
  resources :health_checks , only: [:index]
end