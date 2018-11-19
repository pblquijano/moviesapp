class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :genre
      t.integer :duration
      t.string :directed_by
      t.float :price
      t.text :img
      t.text :synopsis

      t.timestamps
    end
  end
end
