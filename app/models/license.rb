class License < ApplicationRecord

    has_one_attached :file_license

    before_save :capitalize_title, :strip_ize

    validates :begin, :ending, presence: true
    validates :series, numericality: true

    def capitalize_title
        title.capitalize!
    end

    def strip_ize
        title.strip!
        description.strip!
        content.strip!
        remark.strip!
        reg_number.strip!
    end

end
