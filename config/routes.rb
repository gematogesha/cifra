Rails.application.routes.draw do
  
  root to: "sessions#new"
  get "/session", to: redirect('/')

  get "/account", to: "users#account"
  get "/account/settings", to: "users#settings"

  get "/rooms", to: "rooms#new"

  resources :licenses
  resource :session, only: %i[new create destroy]
  resources :rooms, only: %i[create show new], param: :title
  resources :users
  resources :departments

end
