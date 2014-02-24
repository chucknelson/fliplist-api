class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.boolean :completed, default: false
      t.integer :sort_order

      t.references :list, index: true
      t.timestamps
    end
  end
end
