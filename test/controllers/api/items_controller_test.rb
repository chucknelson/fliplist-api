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

  end

end