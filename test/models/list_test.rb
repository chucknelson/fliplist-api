#using spec style tests for consistency with jasmine/angular tests

require 'test_helper'

class ListTest < ActiveSupport::TestCase

  describe 'New List' do
    before do
      @list = List.new
    end

    it 'should require a title' do
      @list.save.must_equal false

      @list.title = 'Valid Title' #standard title
      @list.save.must_equal true

      @list.title = 'A' #short title
      @list.save.must_equal true
    end

    it 'should have a place to store items' do
      @list.items.wont_be_nil
    end
  end

  describe 'Yummy Treats List' do
    before do
      @list = List.find_by title: 'Yummy Treats'
    end

    it 'should have 1 item remaining' do
      @list.items_remaining.must_equal 1
    end

    it 'should not be completed' do
      @list.completed?.must_equal false
    end

    it 'should be completed after completing remaining item' do
      @item = @list.items.find_by completed: false
      @item.update completed: true
      @list.completed?.must_equal true
    end
  end

end