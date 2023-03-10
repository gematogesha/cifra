class UsersController < ApplicationController
  
  before_action :loggedin, :model_name
  before_action :admin_check, except: [:account, :settings]
  before_action :set_user, only: %i[update show destroy edit]

  add_flash_types :info, :error, :success

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to users_path, success: "Пользователь успешно создан"
    else
      flash.now[:error] = "Неправильно заполнены формы регистрации"

      render :new
    end
  end

  def update
    @user.update(user_params)
    
    if @user.update(user_params)
      redirect_to users_path, success: "Пользователь обновлен"
    else
      flash.now[:error] = "Неправильно заполнены формы регистрации"

      render :edit
    end
  end

  def index
    @users = User.all
  end

  def edit
  end

  def destroy

    if @user.admin?
      redirect_to users_path, info: "Нельзя удалить администратора"
    else
      @user.destroy

      redirect_to users_path, success: "Пользователь удален"
    end

  end

  def account
    @user
  end

  def settings
    @user
  end
  

  private

  def user_params
    params.require(:user).permit(:name, :email, :post, :admin, :password, :department_id)
  end

  def set_user
    @user = User.find(params[:id]) rescue not_found
  end

  def model_name
    @model_one = User.model_name.human
    @model_many = User.model_name.human(count: :many)
  end

end
