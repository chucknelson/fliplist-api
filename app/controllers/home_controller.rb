class HomeController < ApplicationController

  def index
  end

  #from https://github.com/mkwiatkowski/todo-rails4-angularjs
  def partial
    render :template => 'partials/' + params[:path], :layout => nil
  end
  #TODO make a generic method that can render a template in any path based on a parameter
  def directive
    render :template => 'directives/' + params[:path], :layout => nil
  end

end
