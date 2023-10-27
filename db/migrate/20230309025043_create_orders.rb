class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.string :title
      t.integer :number 
      t.string :status 
      t.date :create_date
      t.date :archive_date


      t.timestamps
    end
  end
end
