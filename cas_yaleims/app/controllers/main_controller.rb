class MainController < ApplicationController
  
  def index
  	@current_user ||= User.where(netid: session[:cas_user]).first
  	p @current_user
  end

  def current_user
    @current_user ||= User.where(netid: session[:cas_user]).first
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
