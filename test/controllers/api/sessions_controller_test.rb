require 'test_helper'

class Api::SessionsControllerTest < ActionController::TestCase

  before do
    @user = User.find_by name: 'User 1'
    @password = 'password'
  end
  
  describe 'Api::SessionsController' do 
    it 'should create a session when given valid user credentials' do
      post :create, email: @user.email, password: @password, :format => :json
      assert_response :success
      json_response['id'].must_equal @user.id
      json_response['email'].must_equal @user.email
      json_response['name'].must_equal @user.name
    end

    it 'should not create a session with invalid user credentials' do
      post :create, email: @user.email, password: 'incorrect', :format => :json
      assert_response :unauthorized
      json_response.must_equal ActiveSupport::JSON.decode('{}') #basically nil response      
    end
    
  end

end
