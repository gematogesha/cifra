class AddDataToLicense < ActiveRecord::Migration[7.0]
  def change
    add_column :licenses, :type, :string
    add_column :licenses, :reg_number, :string
    add_column :licenses, :issued, :string
    add_column :licenses, :series, :number
    add_column :licenses, :content, :string
    add_column :licenses, :begin, :date
    add_column :licenses, :ending, :date
    add_column :licenses, :user_id, :string
    add_column :licenses, :remark, :string
    add_column :licenses, :status, :string
  end
end
