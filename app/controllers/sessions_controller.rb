class SessionsController < ApplicationController
  def new
  end
  
  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to user_added_products_path #, notice: "Welcome back to Perishab.ly!"
    else
      flash.now[:notice] = "Email or Password is invalid."  
      #flash[:notice] = "Email or Password is invalid."  
      render "new"    
    end
  end

  def destroy
    session[:user_id] = nil

    redirect_to root_url, notice: "Sucessfully logged out."
  end

end

