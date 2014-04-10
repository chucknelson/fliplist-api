require 'test_helper'

class Api::ItemsControllerTest < ActionController::TestCase
  
  #test list and item available for all methods
  before do
    @list = List.find_by title: 'Yummy Treats'
    @incomplete_item = @list.items.find_by completed: false
    @default_count = @list.items.count
    @default_remaining = @list.items_remaining
  end

  describe 'Api::ItemsController' do
    it 'should fetch items for a list' do
      get :index, list_id: @list, :format => :json
      assert_response :success
      json_response.count.must_equal 3
    end

    it 'should create a new item' do
      item_name = 'Cotton Candy'
      post :create, list_id: @list, item: {name: item_name}, :format => :json
      assert_response :success
      json_response['name'].must_equal item_name
      @list.items.count.must_equal @default_count + 1
    end

    it 'should update an item as completed with PUT' do
      put :update, list_id: @list, id: @incomplete_item, item: {completed: true}, :format => :json
      assert_response :success
      @incomplete_item.reload
      @incomplete_item.completed.must_equal true
      @list.items_remaining.must_equal @default_remaining - 1
    end

    it 'should update an item as completed with PATCH' do
      patch :update, list_id: @list, id: @incomplete_item, item: {completed: true}, :format => :json
      assert_response :success
      @incomplete_item.reload
      @incomplete_item.completed.must_equal true
      @list.items_remaining.must_equal @default_remaining - 1
    end

    it 'should delete an item' do
      delete :destroy, list_id: @list, id: @incomplete_item, :format => :json
      assert_response :success
      proc {Item.find(@incomplete_item.id)}.must_raise ActiveRecord::RecordNotFound
      @list.items.count.must_equal @default_count -1
      @list.items_remaining.must_equal @default_remaining - 1
    end

    it 'should sort items' do
      #find items to change sort order
      first_item = @list.items.find_by sort_order: 0
      second_item = @list.items.find_by sort_order: 1

      #prepare and send sort order update data to swap item order
      sort_order_updates = ActiveSupport::JSON.encode([{id: first_item.id, newSortOrder: 1}, {id: second_item.id, newSortOrder: 0}]);
      patch :sort, list_id: @list, sort_order_updates: sort_order_updates, :format => :json

      #assert that the swap was successful
      assert_response :success
      @list.items.find_by(sort_order: 0).id.must_equal second_item.id
      @list.items.find_by(sort_order: 1).id.must_equal first_item.id
    end

  end

end