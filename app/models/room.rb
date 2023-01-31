class Room < ApplicationRecord
    has_many :messages, -> { sorted }, dependet: :destroy
    belongs_to :user
    before_create { self.title = SecureRandom.hex(3) }
end
