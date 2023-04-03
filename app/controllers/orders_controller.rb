class OrdersController < ApplicationController

    before_action :loggedin, :model_name
    before_action :admin_check, only: %i[new create update destroy edit archive]
    before_action :set_order, only: %i[update show destroy edit]
    
    add_flash_types :info, :error, :success
  
    def create
      @order = Order.create(order_params)
  
      if @order.save
        redirect_to orders_path, success: "Приказ создан"
      else
        flash.now[:error] = "Неправильно заполнены формы"
  
        render :new
      end
    end
    
    def update
      @order.update(order_params)
      
      if @order.update(order_params)
        redirect_to orders_path, success: "Приказ обновлен"
      else
        flash.now[:error] = "Неправильно заполнены формы"
  
        render :edit
      end
    end
  
    def destroy 
      @order.destroy
  
      redirect_to orders_path, success: "Приказ удален"
    end
  
    def show
  
    end
    
    def index
      @orders = Order.all.where(status: "Действующий")
    end
  
    def new
      @order = Order.new
    end
  
    def edit
    end
  
    def archive
      @orders = Order.all.where(status: "Архив")
    end

    private
  
    def order_params
      params.require(:order).permit(:title, :create_date, :number, :status, :file_order)
    end
  
    def set_order
      @order = Order.find(params[:id]) rescue not_found
    end
  
    def model_name
      @model_one = Order.model_name.human
      @model_many = Order.model_name.human(count: :many)
    end
  

end
