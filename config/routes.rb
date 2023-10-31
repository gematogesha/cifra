Rails.application.routes.draw do

  get "/session", to: redirect('/')

  get "/dashboard", to: "users#dashboard"
  get "/settings", to: "users#settings"
  get "/orders/archive", to: "orders#archive"

  resources :licenses
  resources :agreements
  resources :orders
  resource :session, only: %i[new create destroy]
  resources :users
  resources :departments

  root to: "sessions#new"

end
