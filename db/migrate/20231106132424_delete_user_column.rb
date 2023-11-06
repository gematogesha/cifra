class DeleteUserColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :department_id
  end
end
