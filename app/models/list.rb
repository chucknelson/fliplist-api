class List < ActiveRecord::Base
  has_many :items
  validates :title, presence: true

  def items_remaining
    self.items.where(completed: false).count
  end

  def completed?
    !self.items.empty? && items_remaining == 0
  end
end
