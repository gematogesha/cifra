class License < ApplicationRecord

    has_one_attached :file_license, dependent: :destroy

    belongs_to :user

    before_save :capitalize_name, :strip_ize

    validates :begin, :ending, :file_license, presence: true
    validates :series, numericality: true

    def capitalize_name
        name.capitalize!
    end

    def strip_ize
        name.strip!
        reg_number.strip!
    end

    scope :with_long_name, -> { where("LENGTH(name) > 20") }

end
