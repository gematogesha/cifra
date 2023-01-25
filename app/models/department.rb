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

    def short_title
        short_title = Array.new()
        title.split(/[\s,-]/).each do |i|
            if i == "и"
                short_title.push(i[0])
            else
                short_title.push(i[0].capitalize)
            end
        end 

        short_title.join('')
        # self.short_title = short_title.join('')
    end

end
