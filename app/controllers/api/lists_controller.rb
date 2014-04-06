class Api::ListsController < ApplicationController

  respond_to :json

  def index
    respond_with :api, List.all
  end

  def show
    respond_with :api, List.find(params[:id])
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

  #custom actions
  def sort
    @sort_order_updates = JSON.parse(params[:sort_order_updates])

    #update items
    @sort_order_updates.each do |sort_update|
      item_id = sort_update['id']
      item_sort = sort_update['newSortOrder']
      Item.where({ id: item_id }).update_all(sort_order: item_sort) #skip model instantiation, which triggers an unnecessary SELECT
    end

    respond_with nil
  end


private
    #strong parameters
    def list_params
      params.require(:list).permit(:title)
    end

end
