Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'items#index'
  resources :items, only: [:index, :create]

  #  ユーザ管理機能のルート
  get     'login',   to: 'sessions#new'
  post    'login',   to: 'sessions#create'
  delete  'logout',  to: 'sessions#destroy'
  
  # ヘルスチェック用の routes を設定
  resources :health_checks , only: [:index]
end