class AddDepartmentBelong < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :department
  end
end
