class MainController < ApplicationController
  
  def index
  end

  def uncas
    session[:user_id] = nil
    session[:cas_user] = nil
    redirect_to :root
  end

  def logout
  	session[:cas_user] = nil
    CASClient::Frameworks::Rails::Filter.logout(self)
  end
end
