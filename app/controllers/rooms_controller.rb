class RoomsController < ApplicationController

    def new
        @new_room = Room.new
        @rooms = Room.all
    end

    def create
        @new_room = current_user&.rooms&.create

        if @new_room.save
            @new_room.broadcast_append_to :rooms
        end
    end

    def show
        @room.find_by!(title: params[:title])
    end

end
