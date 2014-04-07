class Api::ItemsController < ApplicationController

  respond_to :json

  def index
    @list = List.find(params[:list_id])
    respond_with :api, @list, @list.items.order('sort_order')
  end

  def create
    @list = List.find(params[:list_id])
    respond_with :api, @list, @list.items.create(item_params)
  end

  def update
    @list = List.find(params[:list_id])
    respond_with :api, @list, Item.update(params[:id], item_params)
  end

  def destroy
    respond_with :api, Item.destroy(params[:id])
  end

  def sort
    @sort_order_updates = JSON.parse(params[:sort_order_updates])

    #update items
    @sort_order_updates.each do |sort_update|
      item_id = sort_update['id']
      item_sort = sort_update['newSortOrder']
      Item.where({ id: item_id }).update_all(sort_order: item_sort) #skip model instantiation, which triggers an unnecessary SELECT
    end

    respond_with :api, nil
  end

  private
    def item_params
      params.require(:item).permit(:name, :completed, :sort_order)
    end
end
