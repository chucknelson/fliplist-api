class Api::ListsController < ApplicationController

  respond_to :json

  def index
    respond_with :api, List.all
  end

  def show
    respond_with :api, List.find(params[:id]), :include => :items
  end

  def create
    respond_with :api, List.create(list_params)
  end

  def update
    respond_with :api, List.update(params[:id], list_params)
  end

  def destroy
    respond_with :api, List.destroy(params[:id])
  end




private
    #strong parameters
    def list_params
      params.require(:list).permit(:title)
    end

end
