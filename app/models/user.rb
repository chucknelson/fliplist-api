class User < ActiveRecord::Base
  has_many :lists, :dependent => :destroy
  has_secure_password #rails magic

  validates :email, :name, :presence => true
  validates :email, :uniqueness => true
end
