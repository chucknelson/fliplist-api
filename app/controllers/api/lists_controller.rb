class Api::ListsController < ApplicationController

  respond_to :json

  #GET
  def index
    @user = User.find(params[:user_id])
    respond_with :api, @user, @user.lists
  end

  #GET
  def show
    respond_with :api, List.find(params[:id])
  end

  #POST
  #needs to respond with nested resource
  def create
    @user = User.find(params[:user_id])
    respond_with :api, @user, List.create(list_params)
  end

  #PUT
  #doesn't respond with data
  def update
    respond_with :api, List.update(params[:id], list_params)
  end

  #DELETE
  #doesn't respond with data
  def destroy
    respond_with :api, List.destroy(params[:id])
  end

  #custom actions
  #PATCH
  #doesn't respond with data
  def sort
    @sort_order_updates = params[:sort_order_updates]

    #update items
    @sort_order_updates.each do |sort_update|
      item_id = sort_update['id']
      item_sort = sort_update['newSortOrder']
      Item.where({ id: item_id }).update_all(sort_order: item_sort) #skip model instantiation, which triggers an unnecessary SELECT
    end

    respond_with :api, nil
  end


private
    #strong parameters
    def list_params
      params.require(:list).permit(:title)
    end

end
