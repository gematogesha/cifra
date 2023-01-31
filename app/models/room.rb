class Room < ApplicationRecord
    belogngs_to :user
    before_create { self.title = SecureRandom.hex(3) }
end
