require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  
  describe 'HomeController' do
    it 'should render correct index template and layout' do
      get :index
      assert_response :success
      assert_template :index
      assert_template :layout => :application
    end

    it 'should render correct partial with no layout' do
      get :partial, path: 'lists'
      assert_response :success
      assert_template 'lists'
      assert_template :layout => nil
    end

    it 'should render correct directive with no layout' do
      get :directive, path: 'fl-editable-text'
      assert_response :success
      assert_template 'fl-editable-text'
      assert_template :layout => nil
    end
  end

end
