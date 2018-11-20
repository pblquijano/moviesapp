Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}  
  resources :movies
  
  post '/make_a_rent', to: 'movies#make_a_rent'
  root 'home#index' 
  get '*path', to: 'home#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
