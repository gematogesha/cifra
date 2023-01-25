class SeriesChangeColumnType < ActiveRecord::Migration[7.0]
  def change
    change_column :licenses, :series, :integer
  end
end
