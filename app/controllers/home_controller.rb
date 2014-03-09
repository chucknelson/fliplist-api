class HomeController < ApplicationController

  def index
  end

  #from https://github.com/mkwiatkowski/todo-rails4-angularjs
  def partial
    render :template => 'partials/' + params[:path], :layout => nil
  end

end
