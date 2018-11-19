class Movie < ApplicationRecord
    validates :title, presence: true
    validates :genre, presence: true
    validates :duration, presence: true
    validates :directed_by, presence: true
    validates :price, presence: true
    validates :synopsis, presence: true
end
