class User < ApplicationRecord
    has_secure_password

    has_many :license
    belongs_to :department

    before_save :title_ize, :upcase_name, :strip_ize
    
    validates :full_name, :login, :post, presence: true, uniqueness: true
    validates :post, presence: true

    def title_ize
        login.downcase!
        post.capitalize!
    end

    def upcase_name
        full_name.split.each{|i| i.capitalize!}.join(' ')
    end

    def strip_ize
        full_name.strip!
        login.strip!
        post.strip!
    end
    

end
