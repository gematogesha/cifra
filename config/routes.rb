Rails.application.routes.draw do
  
  root to: "sessions#new"
  get "/session", to: redirect('/')

  get "/account", to: "users#account"
  get "/account/settings", to: "users#settings"

  resources :licenses
  resource :session, only: %i[new create destroy]
  resources :users
  resources :departments

end
