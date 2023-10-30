Rails.application.routes.draw do
  get "/users/get_users"

  get "/session", to: redirect('/')

  get "/account", to: "users#account"
  get "/account/settings", to: "users#settings"
  get "/orders/archive", to: "orders#archive"

  resources :licenses
  resources :agreements
  resources :orders
  resource :session, only: %i[new create destroy]
  resources :rooms, only: %i[index create show], param: :title
  resources :messages, only: :create
  resources :users
  resources :departments

  root to: "sessions#new"

end
