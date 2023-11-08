class DropRooms < ActiveRecord::Migration[7.0]
  def change
    drop_table :rooms do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
    end
  end
end 
