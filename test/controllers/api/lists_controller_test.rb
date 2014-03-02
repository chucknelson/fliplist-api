require 'test_helper'

class Api::ListsControllerTest < ActionController::TestCase
  
  #test list available for all methods
  before do
    @default_count = List.count
    @list = List.find_by title: 'Yummy Treats'
  end

  describe 'Api::ListsController' do
    it 'should get all lists' do
      get :index, :format => :json
      assert_response :success
      lists.wont_be_nil
    end

    it 'should get a specific list' do
      get :show, id: @list, :format => :json
      assert_response :success
      json_response['title'].must_equal @list.title
    end

    it 'should create a new list' do
      #could use rails-specific assertion here, but sticking with spec-like tests
      #assert_difference 'List.count' do
      #  post :create, list: {title: list_title}, :format => :json
      #end
      list_title = 'A New List'
      post :create, list: {title: list_title}, :format => :json
      assert_response :success
      json_response['title'].must_equal list_title
      List.count.must_equal @default_count + 1
    end

    it 'should update an existing list with PUT' do
      list_title = 'Really Yummy Treats'
      put :update, id: @list, list: {title: list_title}, :format => :json
      assert_response :success
      @list.reload
      @list.title.must_equal list_title
    end

    it 'should update an existing list with PATCH' do
      list_title = 'Really Yummy Treats'
      patch :update, id: @list, list: {title: list_title}, :format => :json
      assert_response :success
      @list.reload
      @list.title.must_equal list_title
    end

    it 'should delete an existing list' do
      delete :destroy, id: @list, :format => :json
      assert_response :success
      proc {List.find(@list.id)}.must_raise ActiveRecord::RecordNotFound
      List.count.must_equal @default_count - 1
    end

  end

end
