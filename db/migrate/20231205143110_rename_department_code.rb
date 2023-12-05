class RenameDepartmentCode < ActiveRecord::Migration[7.0]
  def change
    rename_column :departments, :department_code, :code
  end
end
