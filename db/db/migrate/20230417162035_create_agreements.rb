class CreateAgreements < ActiveRecord::Migration[7.0]
  def change
    create_table :agreements do |t|
      t.text :title
      t.text :description
      t.string :reg_number
      t.string :issued
      t.integer :series
      t.string :content
      t.date :begin
      t.date :ending
      t.string :remark
      t.string :status

      t.timestamps
    end

    add_reference :agreements, :user
  end
end
