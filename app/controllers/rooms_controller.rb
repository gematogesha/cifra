class RoomsController < ApplicationController

    before_action :loggedin
    before_action :set_room, only: %i[show destroy]

    def index
        @new_room = Room.new
        @rooms = Room.all
    end

    def create
        @new_room = current_user&.rooms&.build

        if @new_room.save
            @new_room.broadcast_append_to :rooms
        end
    end

    def show
        @messages = @room.messages
        @new_message = current_user&.messages&.build
    end

    def set_room
        @room = Room.find_by!(title: params[:title]) rescue not_found
    end

end
