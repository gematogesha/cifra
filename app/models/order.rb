class Order < ApplicationRecord

    has_one_attached :file_order, dependent: :destroy

    before_save :capitalize_title, :strip_ize

    validates :create_date, presence: true
    validates :number, numericality: true

    def capitalize_title
        title.capitalize!
    end

    def strip_ize
        title.strip!
    end

end
