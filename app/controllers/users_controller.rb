class UsersController < ApplicationController
  
  before_action :login?, :model_name
  before_action :admin?, except: [:account, :settings]
  before_action :set_user, only: %i[update show destroy edit]

  add_flash_types :info, :error, :success

  def index
    @page_title = @model_many
    @users = User.all
  end

  def show
    @page_title = @user.full_name
    @department_name = Department.find_by(id: @user.department_id).name
  end

  def new
    @page_title = @model_many
    @user = User.new
  end

  def create
    @page_title = @model_many

    @user = User.create(user_params)

    if @user.save
      redirect_to users_path, success: I18n.t("notices.success.create")
    else
      flash.now[:error] = I18n.t("notices.errors.create")

      render :new
    end
  end

  def update
    @page_title = @user.full_name
    @user.update(user_params)
    
    if @user.update(user_params)
      redirect_to users_path, success: I18n.t("notices.success.update", model: @model_one)
    else
      flash.now[:error] = I18n.t("notices.errors.update")

      render :edit
    end
  end

  def edit
    @page_title = @user.full_name
  end

  def destroy

    if @user.admin?
      redirect_to users_path, info: "Нельзя удалить администратора"
    else
      @user.destroy
      redirect_to users_path, success: "Пользователь удален"
    end

  end

  def dashboard
    @page_title = I18n.t("attr.user.dashboard")
    
    add_pie_chart("end", "matrix", 10)
    add_pie_chart("new", "rocky", 8)
    add_pie_chart("overdue", "fargo", 4)
    add_pie_chart("escalation", "lebowski", nil)

    @pie_charts_sum = 0

    @pie_charts_count = 0 

    
    pie_charts.each_with_index do |chart, index|
      if chart.present?
        @pie_charts_sum += chart.count
        @pie_charts_count += 1
        @koeff = ((100.0 - @pie_charts_count * 4) / @pie_charts_sum)
      end
    end
    
  end

  def settings
    @user
  end
  

  private

  def user_params
    params.require(:user).permit(:full_name, :login, :post, :admin, :password, :department_id)
  end

  def set_user
    @user = User.find_by!(login: params[:login]) rescue not_found
  end

  def model_name
    @model_one = User.model_name.human
    @model_many = User.model_name.human(count: :many)
  end

end
