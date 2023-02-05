class DepartmentsController < ApplicationController
  
  before_action :loggedin, :admin_check, :model_name

  before_action :set_department, only: %i[update show destroy edit]

  add_flash_types :info, :error, :success

  
  def new
    @department = Department.new
  end

  def create
    @department = Department.new(department_params)

    short_title

    if @department.save
      redirect_to departments_path, success: "Отдел успешно создан"
    else
      flash.now[:error] = "Неправильно заполнены формы регистрации"

      render :new
    end
  end

  def update
    @department.update(department_params)

    short_title
    
    if @department.update(department_params)
      redirect_to departments_path, success: "Отдел обновлен"
    else
      flash.now[:error] = "Неправильно заполнены формы регистрации"

      render :edit
    end
  end

  def index
    @departments = Department.all
  end

  def edit
  end

  def destroy
      @department.destroy
      redirect_to departments_path, success: "Отдел удален"
  end
        

  private

  def department_params
    params.require(:department).permit(:title, :number, :short_name)
  end

  def set_department
    @department = Department.find(params[:id]) rescue not_found
  end

  def model_name
    @model_one = Department.model_name.human
    @model_many = Department.model_name.human(count: :many)
  end     
def short_title

  @department.short_title = ''
  @department.title.split(/[\s,-]/).each do |i|
    if i == "и"
      @department.short_title << i[0]
    else
      @department.short_title << i[0][0].capitalize
    end
  end 
  
end


end
