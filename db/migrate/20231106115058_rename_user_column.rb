class RenameUserColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column :user, :email, :login
  end
end
