class HomeController < ApplicationController
  def index
    user_signed_in = user_signed_in?
    if !user_signed_in
      redirect_to "/users/sign_in"
    end
  end
end
