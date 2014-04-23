class Api::ItemsController < ApplicationController

  respond_to :json

  #GET
  def index
    respond_with :api, Item.where(:list_id => params[:list_id]).order('sort_order')
  end

  #POST
  #needs to respond with nested resource
  def create
    @user = User.find(params[:user_id])
    @list = List.find(params[:list_id])
    respond_with :api, @user, @list, @list.items.create(item_params)
  end

  #PUT
  #doesn't respond with data
  def update
    respond_with :api, Item.update(params[:id], item_params)
  end

  #DELETE
  #doesn't respond with data
  def destroy
    respond_with :api, Item.destroy(params[:id])
  end

  private
    def item_params
      params.require(:item).permit(:name, :completed, :sort_order)
    end
end
