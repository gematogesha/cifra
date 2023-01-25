class License < ApplicationRecord

    has_one_attached :file_license

    belongs_to :user

    before_save :capitalize_title, :strip_ize

    validates :begin, :ending, presence: true
    validates :series, numericality: true

    def capitalize_title
        title.capitalize!
    end

    def strip_ize
        title.strip!
        reg_number.strip!
    end

end
