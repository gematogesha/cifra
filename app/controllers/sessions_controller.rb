class SessionsController < ApplicationController

  add_flash_types :info, :error, :success

  def new
    if current_user.present?
      redirect_to licenses_path
    end
    
  end

  def create
    user_params = params.require(:session)

    user = User.find_by(email: user_params[:email])&.authenticate(user_params[:password])

    if user.present?
      session[:user_id] = user.id

      redirect_to dashboard_path, info: "Вы вошли на сайт"
    else
      redirect_to root_path, error: "Неправельный email или пароль"

    end
  end

  def destroy
    session.delete(:user_id)

    redirect_to root_path, info: "Вы вышли из аккаунта"

  end

end
