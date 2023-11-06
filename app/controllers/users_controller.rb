class UsersController < ApplicationController
  
  before_action :loggedin, :model_name
  before_action :admin_check, except: [:account, :settings]
  before_action :set_user, only: %i[update show destroy edit]
  before_action :human_att

  add_flash_types :info, :error, :success

  def index
    @page_title = @model_many
    @users = User.all

    @subtitle_1 = I18n.t("attr.user.list")

  end


  def new
    @page_title = @model_many
    @user = User.new

    @subtitle_1 = I18n.t("attr.user.create")

  end

  def create
    @page_title = @model_many

    @subtitle_1 = I18n.t("attr.user.create")

    @user = User.new(user_params)

    if @user.save
      redirect_to users_path, success: "Пользователь успешно создан"
    else
      flash.now[:error] = I18n.t("errors.save")

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
    params.require(:user).permit(:name, :login, :post, :admin, :password, :department_id)
  end

  def set_user
    @user = User.find(params[:id]) rescue not_found
  end

  def model_name
    @model_one = User.model_name.human
    @model_many = User.model_name.human(count: :many)
  end

  def human_att
    @human_att = [I18n.t("attr.user.name"), I18n.t("attr.user.login"), I18n.t("attr.user.post")]
  end

end
