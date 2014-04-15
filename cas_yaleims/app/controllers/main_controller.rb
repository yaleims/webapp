class MainController < ApplicationController
  
  def index
  	@current_user ||= User.where(netid: session[:cas_user]).first
  	p @current_user.name
  	p @current_user.collegeName
  	p @current_user.collegeURL
  	p @current_user.studentNetid
  	p @current_user.studentEmail
  	p @current_user.graduationYear
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
