require "rails_helper"
require 'spec_helper'

describe MoviesController do
    describe "GET index" do
        it "has a 200 status code" do
            get :index
            expect(response.status).to eq(200)
        end               
    end
    describe "GET 'show' " do
        movie = Movie.create(:title => 'title', :genre => 'genre',
                         :price => 99, :duration => 99, :directed_by => 'pw1234', :synopsis => 'Sypnosis')
        it "returns a successful 200 response" do
            get :show, params: {:id => movie.id}, as: :json
            expect(response).to be_success
        end
    
        it "returns data of an single movie" do
            get :show, params: {:id => movie.id}, as: :json
            puts(response.body)
            parsed_response = JSON.parse(response.body)
            expect(parsed_response['title']).to_not be_nil
        end
    
        it "returns an error if the movie does not exist" do
            get :show, params: {:id =>0}, as: :json
            parsed_response = JSON.parse(response.body)
            expect(parsed_response['error']).to eq("Movie does not exist")
            expect(response).to be_not_found
        end
    end
    describe "DELETE 'destroy' " do
        movie = Movie.create(:title => 'title', :genre => 'genre',
                         :price => 99, :duration => 99, :directed_by => 'pw1234', :synopsis => 'Sypnosis')
        it "returns a successful 204 response" do
            delete :destroy, params: {:id => movie.id}, as: :json
            expect(response).to be_success
        end
        it "returns an error if the movie does not exist" do
            delete :destroy, params: {:id =>0}, as: :json
            parsed_response = JSON.parse(response.body)
            expect(parsed_response['error']).to eq("Movie does not exist")
            expect(response).to be_not_found
        end
            
    end
    describe "PUT 'update' " do
        movie = Movie.create(:title => 'title', :genre => 'genre',
                         :price => 99, :duration => 99, :directed_by => 'pw1234', :synopsis => 'Sypnosis')
        it "returns a successful 201 response" do
            put :update, params: {:id =>movie.id, :movie => {:title => 'NewTitle'}}, as: :json
            expect(response).to be_success
        end
        it "returns an error if the movie does not exist" do
            put :update, params: {:id =>0, :movie => {:title => 'NewTitle'}}, as: :json
            parsed_response = JSON.parse(response.body)
            expect(parsed_response['error']).to eq("Movie does not exist")
            expect(response).to be_not_found
        end
            
    end
    describe "POST 'create' " do
        it "returns a successful 201 response" do
            post :create, params: {:title => 'title', :genre => 'genre', :price => 99, :duration => 99, :directed_by => 'pw1234', :synopsis => 'Sypnosis'}, as: :json
            expect(response).to be_success
        end                    
    end
    
end