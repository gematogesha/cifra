class Department < ApplicationRecord

    before_save :capitalize_title, :strip_ize, :upcase_title, :short_title

    validates :number, numericality: true, uniqueness: true
    validates :title, presence: true, uniqueness: true

    def capitalize_title
        title.capitalize!
    end

    def strip_ize
        title.strip!
    end
    
    def upcase_title
        title.split.each{|i| i.capitalize!}.join(' ')
    end



end
