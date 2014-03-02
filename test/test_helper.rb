ENV["RAILS_ENV"] ||= "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  ActiveRecord::Migration.check_pending!

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  fixtures :all

  # Add more helper methods to be used by all tests here...

  # Test result format via Turn gem
  Turn.config.format = :outline

  # Helper method for simple logging (debug only)
  def log(msg)
    Rails::logger.debug msg
  end

  # Helper method for standard JSON response body in functional tests
  def json_response
    ActiveSupport::JSON.decode @response.body
  end
end
