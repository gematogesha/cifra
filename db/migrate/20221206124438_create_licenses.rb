class CreateLicenses < ActiveRecord::Migration[7.0]
  def change
    create_table :licenses do |t|
      t.text :title
      t.text :description

      t.timestamps
    end
  end
end
