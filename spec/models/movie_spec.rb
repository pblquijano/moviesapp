require 'rails_helper'
describe Movie do
    it "is valid with a firstname, lastname and email" do
      movie = Movie.new(
        title: 'The Movie',
        genre: 'Thriller',
        directed_by: 'Pablo Quijano',
        price: 99,
        synopsis: 'This is the synopsis.',
        duration: 120)
      expect(movie).to be_valid
    end
  
    it "is invalid without a title" do
      movie = Movie.new(title: nil)
      movie.valid?
      expect(movie.errors[:title]).to include("can't be blank")
    end
  
    it "is invalid without a genre" do
      movie = Movie.new(genre: nil)
      movie.valid?
      expect(movie.errors[:genre]).to include("can't be blank")
    end
  
    it "is invalid without a directed_by" do
        movie = Movie.new(directed_by: nil)
        movie.valid?
        expect(movie.errors[:genre]).to include("can't be blank")
    end

    it "is invalid without a price" do
        movie = Movie.new(price: nil)
        movie.valid?
        expect(movie.errors[:price]).to include("can't be blank")
    end

    it "is invalid without a synopsis" do
      movie = Movie.new(synopsis: nil)
      movie.valid?
      expect(movie.errors[:synopsis]).to include("can't be blank")
    end

    it "is invalid without a duration" do
        movie = Movie.new(duration: nil)
        movie.valid?
        expect(movie.errors[:duration]).to include("can't be blank")
      end
end