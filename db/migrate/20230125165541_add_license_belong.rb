class AddLicenseBelong < ActiveRecord::Migration[7.0]
  def change
    remove_column :licenses, :user_id, :string
    add_reference :licenses, :user
  end
end
