class Api::UsersController < ApplicationController

  respond_to :json

  def index
    respond_with :api, User.all
  end
  
end
