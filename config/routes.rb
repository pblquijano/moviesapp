Rails.application.routes.draw do
  resources :movies
  
  post '/make_a_rent', to: 'movies#make_a_rent'
  root 'home#index' 
  get '*path', to: 'home#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
