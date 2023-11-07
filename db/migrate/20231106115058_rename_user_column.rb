class RenameUserColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :email, :login
  end
end
