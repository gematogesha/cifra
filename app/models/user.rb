class User < ApplicationRecord
    has_secure_password

    before_save :title_ize, :upcase_name, :strip_ize
    
    validates :name, :email, presence: true, uniqueness: true

    def title_ize
        email.downcase!
        post.capitalize!
    end

    def upcase_name
        name.split.each{|i| i.capitalize!}.join(' ')
    end

    def strip_ize
        name.strip!
        email.strip!
        post.strip!
    end
end
