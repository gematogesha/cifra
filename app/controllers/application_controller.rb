class ApplicationController < ActionController::Base
  	helper_method :current_user
	before_action :set_cookies
	helper_method :pie_charts


	def not_found
		raise ActionController::RoutingError.new('Not Found')
	rescue
		render file: "#{Rails.root}/public/404.html", status: :not_found
	end

	def unprocessable_entity
		raise ActionController::RoutingError.new('Unprocessable entity')
	rescue
		render file: "#{Rails.root}/public/422.html", status: :unprocessable_entity
	end

	def internal_server_error
		raise ActionController::RoutingError.new('Internal server error')
	rescue
		render file: "#{Rails.root}/public/500.html", status: :internal_server_error
	end

	
	private

	def pie_charts
		@pie_charts ||= []
	  end
	
	def add_pie_chart(name, color = nil, count = nil)
	pie_charts << PieChart.new(name, color, count)
	end
  

	def current_user
		@current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
	end

	def login?
		if current_user.present?
			return
		else
			redirect_to root_path
		end
	end

	def admin?		
		if current_user.admin?
			return
		else
			not_found
		end
	end	

	def set_cookies
		if cookies[:theme].nil?
			cookies[:theme] = "default"
		end

		if cookies[:menu].nil?
			cookies[:menu] = "full"
		end

	end
	

	
end
