class Api::V1::UserdataController < ApplicationController
	 def me
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
	      p[:email] = @user.studentEmail
	      render :json => {:status => "success", :person => p}
	    else # should never happen
	      render :json => {:status => "fail", :flash => "No such user >:("}
	    end
	  end

	  def auth
	    redirect_to :root
	  end
end
