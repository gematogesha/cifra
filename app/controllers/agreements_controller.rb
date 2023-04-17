class AgreementsController < ApplicationController

    before_action :loggedin, :model_name
    before_action :admin_check, only: %i[new create update destroy edit]
    before_action :set_agreement, only: %i[update show destroy edit]
    
    add_flash_types :info, :error, :success
  
    def create
      @agreement = Agreement.create(agreement_params)
  
      if @agreement.save
        redirect_to agreements_path, success: "Лицензия создана"
      else
        flash.now[:error] = "Неправильно заполнены формы"
  
        render :new
      end
    end
    
    def update
      @agreement.update(agreement_params)
      
      if @agreement.update(agreement_params)
        redirect_to agreements_path, success: "Лицензия обновлена"
      else
        flash.now[:error] = "Неправильно заполнены формы"
  
        render :edit
      end
    end
  
    def destroy 
      @agreement.destroy
  
      redirect_to agreements_path, success: "Лицензия удалена"
    end
  
    def show
  
    end
    
    def index
      @agreements = Agreement.all
    end
  
    def new
      @agreement = Agreement.new
    end
  
    def edit
    end
  
    private
  
    def agreement_params
      params.require(:agreement).permit(:title, :description, :reg_number, :issued, :series, :content, :begin, :ending, :user_id, :remark, :status, :file_agreement)
    end
  
    def set_agreement
      @agreement = Agreement.find(params[:id]) rescue not_found
    end
  
    def model_name
      @model_one = Agreement.model_name.human
      @model_many = Agreement.model_name.human(count: :many)
    end
  

end
