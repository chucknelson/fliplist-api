class Api::SessionsController < ApplicationController

  respond_to :json

  def create
    user = User.find_by(email: params[:email])

    #not returning a resource so using basic render method to send arbitrary data
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      cookies[:user_id] = user.id
      render json: user, :only => [:id, :email, :name]
    else
      render json: {}, status: :unauthorized #HTTP 401 Unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
    cookies.delete :user_id
    respond_with nil
  end

end
