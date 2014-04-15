class MainController < ApplicationController
  def index
  	p session[:cas_user]
  end

  def uncas
    session[:user_id] = nil
    session[:cas_user] = nil
    redirect_to :root
  end

  def logout
    CASClient::Frameworks::Rails::Filter.logout(self)
  end
end
