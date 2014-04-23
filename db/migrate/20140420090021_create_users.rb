class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :name
      t.string :password_digest

      t.timestamps
    end

    add_column :lists, :user_id, :integer
  end
end
