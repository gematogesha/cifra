class RemoveTypeFromLicense < ActiveRecord::Migration[7.0]
  def change
    remove_column :licenses, :type, :string
  end
end
