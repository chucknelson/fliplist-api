require 'test_helper'

class ItemTest < ActiveSupport::TestCase
  
  describe 'New Item' do
    before do
      @item = Item.new
    end

    it 'should require a name' do
      @item.save.must_equal false
      
      @item.name = 'Valid Name' #standard title
      @item.save.must_equal true

      @item.name = 'A' #short title
      @item.save.must_equal true
    end
  end

end
