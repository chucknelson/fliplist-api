require 'test_helper'

class Api::ListsControllerTest < ActionController::TestCase
  
  #test list available for all methods
  before do
    @default_count = List.count
    @list = List.find_by title: 'Yummy Treats'
    @user = User.find(@list.user_id)
  end

  describe 'Api::ListsController' do
    it 'should get all lists' do
      get :index, user_id: @user, :format => :json
      assert_response :success
      lists.wont_be_nil
    end

    it 'should get a specific list' do
      get :show, user_id: @user, id: @list, :format => :json
      assert_response :success
      json_response['title'].must_equal @list.title
      json_response['items'].must_be_nil
    end

    it 'should create a new list' do
      #could use rails-specific assertion here, but sticking with spec-like tests
      #assert_difference 'List.count' do
      #  post :create, list: {title: list_title}, :format => :json
      #end
      list_title = 'A New List'
      post :create, user_id: @user, list: {title: list_title}, :format => :json
      assert_response :success
      json_response['title'].must_equal list_title
      List.count.must_equal @default_count + 1
    end

    it 'should update an existing list with PUT' do
      list_title = 'Really Yummy Treats'
      put :update, user_id: @user, id: @list, list: {title: list_title}, :format => :json
      assert_response :success
      @list.reload
      @list.title.must_equal list_title
    end

    it 'should update an existing list with PATCH' do
      list_title = 'Really Yummy Treats'
      patch :update, user_id: @user, id: @list, list: {title: list_title}, :format => :json
      assert_response :success
      @list.reload
      @list.title.must_equal list_title
    end

    it 'should delete an existing list' do
      delete :destroy, user_id: @user, id: @list, :format => :json
      assert_response :success
      proc {List.find(@list.id)}.must_raise ActiveRecord::RecordNotFound
      List.count.must_equal @default_count - 1
    end

    it 'should sort items' do
      #find items to change sort order
      first_item = @list.items.find_by sort_order: 0
      second_item = @list.items.find_by sort_order: 1

      #prepare and send sort order update data to swap item order
      sort_order_updates = [{id: first_item.id, newSortOrder: 1}, {id: second_item.id, newSortOrder: 0}];
      patch :sort, user_id: @user, list_id: @list, sort_order_updates: sort_order_updates, :format => :json

      #assert that the swap was successful
      assert_response :success
      @list.items.find_by(sort_order: 0).id.must_equal second_item.id
      @list.items.find_by(sort_order: 1).id.must_equal first_item.id
    end

  end

end
