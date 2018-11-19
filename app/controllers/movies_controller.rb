class MoviesController < ApplicationController
  def index
      render json: Movie.all
  end
  def show
      movie = Movie.find_by_id(params[:id])
      if movie.nil?
          render json: { error: "Movie does not exist" }, status: :not_found
      else
          render json: movie
      end
      
  end
  def create
      movie = Movie.create(movie_params)
      render json: movie
  end

  def destroy        
      movie = Movie.find_by_id(params[:id])
      if movie.nil?
          render json: { error: "Movie does not exist" }, status: :not_found
      else
          Movie.destroy(params[:id])
      end
  end

  def update
      movie = Movie.find_by_id(params[:id])
      if movie.nil?
          render json: { error: "Movie does not exist" }, status: :not_found
      else
          movie.update_attributes(movie_params)
          render json: movie
      end
      
  end

  def make_a_rent        
      successRange = rand(1..10)
      if successRange > 5
        render json: { code: 200, message: "The rent was completed."}.to_json
      else
        render json: {status: "error", code: 3000, message: "You can't rent it because you have debts."}
      end
      #render json: Movie.all
      
  end

  def movie_params
      params.require(:movie).permit(:id, :title, :genre, :price, :directed_by, :duration, :synopsis, :img)
  end
end
