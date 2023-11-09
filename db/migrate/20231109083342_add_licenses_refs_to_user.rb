class AddLicensesRefsToUser < ActiveRecord::Migration[7.0]
  def change
    add_reference :licenses, :user, index: true
  end
end
