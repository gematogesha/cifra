class AddDepartmentToUsers < ActiveRecord::Migration[7.0]
  def change
      add_reference :users, :department, index: true

  end
end

