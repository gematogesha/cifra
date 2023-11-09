class CreateLicenses < ActiveRecord::Migration[7.0]
  def change
    create_table :licenses do |t|

      t.text "name", null: false
      t.text "description"
      t.string "reg_number", null: false
      t.string "issued", null: false
      t.integer "series", null: false
      t.string "content"
      t.date "begin", null: false
      t.date "ending", null: false
      t.string "remark"
      t.string "status", null: false

      t.timestamps
    end
  end
end
