class Api::ItemsController < ApplicationController

  respond_to :json

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

  private
    def item_params
      params.require(:item).permit(:name, :completed)
    end
end
