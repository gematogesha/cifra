class RoomsController < ApplicationController

    before_action :loggedin
    before_action :set_room, only: %i[show destroy]

    add_flash_types :info, :error, :success

    def index
        @new_room = Room.new
        @rooms = Room.all
    end

    def create
        @new_room = Room.new(user: current_user)

        if @new_room.save
            flash.now[:success] = "Комната создана"
            turbo_render_flash(flash)
            @new_room.broadcast_append_to :rooms
        else
            flash.now[:error] = "Что-то пошло не так..."
            turbo_render_flash(flash)
            render :index
        end
    end

    def show
        @messages = @room.messages
        @new_message = current_user&.messages&.build(room: @room)
    end

    def set_room
        @room = Room.find_by!(title: params[:title]) rescue not_found
    end

    private 

    def turbo_render_flash(flash)
        Turbo::StreamsChannel.broadcast_update_to([current_user, :rooms], target: 'notification', partial: 'shared/notification', locals: { flash: flash })
      end

end
