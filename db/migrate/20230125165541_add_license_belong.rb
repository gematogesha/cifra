class AddLicenseBelong < ActiveRecord::Migration[7.0]
  def change
    add_reference :licenses, :user
  end
end
