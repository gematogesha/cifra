class ApplicationController < ActionController::Base
  	helper_method :current_user

	private

	
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


	def current_user
		@current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
	end

	def loggedin
		if current_user.present?
			return
		else
			redirect_to root_path
		end
	end

	def admin_check		
		if current_user.admin?
			return
		else
			unprocessable_entity
		end
	end	


	
end
