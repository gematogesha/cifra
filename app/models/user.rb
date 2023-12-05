class User < ApplicationRecord
    has_secure_password

    has_many :licenses
    belongs_to :department

    before_save :normal
    
    validates :login, presence: true, uniqueness: true
    validates :post, :full_name, presence: true

    def normal
        self.login = self.login.downcase.strip
        self.full_name = self.full_name.titleize.strip
        self.post = self.post.humanize.strip
    end

    scope :not_admin, -> { where(admin: false) }

end