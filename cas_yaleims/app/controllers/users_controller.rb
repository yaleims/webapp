class UsersController < ApplicationController

  def auth
    redirect_to :root
  end

  # def info
  #   @user = User.find(session[:user_id])
  #   if @user
  #     old_nickname = @user.nickname

  #     g = params[:gender].to_i
  #     p = params[:preference].to_i
  #     @user.gender = g if (1..2).include? g
  #     @user.preference = p if (1..3).include? p
  #     @user.major = params[:major] if params[:major] and params[:major] != ""
  #     @user.nickname = params[:nickname] if params[:nickname] and params[:nickname] != ""
  #     @user.active = true
  #     @user.save

  #     render :partial => "main/user_info", :locals => {:u => @user}

  #     if params[:nickname] and params[:nickname] != old_nickname
  #       User.make_names
  #     end
  #     return
  #   else
  #     render :json => {:status => "fail", :flash => "Couldn't update your preferences."}
  #   end
  #   redirect_to :root
  # end

  # Takes a user's name (e.g. Faiaz "Rafi" Khan), parses out the nickname
  # and renders a json of the user. This is necessary because of how the 
  # typeahead works
  def whois
    @user = User.where(netid: session[:cas_user]).first
    if not @user
      render :json => {:status => "not logged in"}
      return
    end
    p = {}
    if @user
      p[:name] = @user.name
      p[:id] = @user.studentNetid
      p[:year] = @user.graduationYear
      p[:college] = @user.collegeName
      p[:collegeurl] = @user.collegeURL
      render :json => {:status => "success", :person => p}
    else # should never happen
      render :json => {:status => "fail", :flash => "No such user >:("}
    end
  end
end