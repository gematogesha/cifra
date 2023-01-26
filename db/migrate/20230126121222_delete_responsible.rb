class DeleteResponsible < ActiveRecord::Migration[7.0]
  def change
    remove_column :licenses, :responsible, :string
  end
end
