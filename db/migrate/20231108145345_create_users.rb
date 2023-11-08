class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string "full_name", null: false
      t.string "login", null: false
      t.string "post", null: false
      t.string "password_digest", null: false
      t.boolean "admin", default: false, null: false

      t.timestamps
    end
  end
end
