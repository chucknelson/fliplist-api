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
  end

end
