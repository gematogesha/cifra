class DropMessages < ActiveRecord::Migration[7.0]
  def change
    drop_table :messages do |t|
      t.integer "user_id", null: false
      t.integer "room_id", null: false
      t.string "body", null: false
    end
  end
end
