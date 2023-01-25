class AddLicenseBelong < ActiveRecord::Migration[7.0]
  def change
    add_reference :licenses, :user
    remove_column :licenses, :user_id, :string
  end
end
