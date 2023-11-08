class Department < ApplicationRecord

    before_save :capitalize_title, :strip_ize, :upcase_name

    has_many :users

    validates :department_code, numericality: {less_than_or_equal_to: 999}, uniqueness: true
    validates :name, presence: true, uniqueness: true

    def capitalize_title
        name.capitalize!
    end

    def strip_ize
        name.strip!
    end
    
    def upcase_name
        name.split.each{|i| i.capitalize!}.join(' ')
    end

    scope :ordered_by_title, -> { order(name: :asc) }

end
