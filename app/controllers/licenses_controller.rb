class LicensesController < ApplicationController
  
  before_action :login?, :model_name
  before_action :admin?, only: %i[new create update destroy edit]
  before_action :set_license, only: %i[update show destroy edit]
  
  add_flash_types :info, :error, :success


  def index
    @page_title = @model_many
    @licenses = License.all
  end

  def create
    @license = License.create(license_params)

    if @license.save
      redirect_to licenses_path, success: "Лицензия создана"
    else
      flash.now[:error] = "Неправильно заполнены формы"

      render :new
    end
  end
  
  def update
    @license.update(license_params)
    
    if @license.update(license_params)
      redirect_to licenses_path, success: "Лицензия обновлена"
    else
      flash.now[:error] = "Неправильно заполнены формы"

      render :edit
    end
  end

  def destroy 
    @license.destroy

    redirect_to licenses_path, success: "Лицензия удалена"
  end

  def show

  end
  
  def new
    @license = License.new
  end

  def edit
  end

  private

  def license_params
    params.require(:license).permit(:name, :description, :reg_number, :issued, :series, :content, :begin, :ending, :user_id, :remark, :status, :file_license)
  end

  def set_license
    @license = License.find(params[:id]) rescue not_found
  end

  def model_name
    @model_one = License.model_name.human
    @model_many = License.model_name.human(count: :many)
  end

end