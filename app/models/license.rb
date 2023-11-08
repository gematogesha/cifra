class License < ApplicationRecord

    has_one_attached :file_license, dependent: :destroy

    belongs_to :user

    before_save :capitalize_title, :strip_ize

    validates :begin, :ending, :file_license, presence: true
    validates :series, numericality: true

    def capitalize_title
        title.capitalize!
    end

    def strip_ize
        title.strip!
        reg_number.strip!
    end

    scope :with_long_title, -> { where("LENGTH(title) > 20") }

end
