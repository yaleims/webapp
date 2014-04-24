class CreateUsers < ActiveRecord::Migration
  def change
    create_table "users", force: true do |t|
    t.string   "fname"
    t.string   "lname"
    t.string   "email"
    t.string   "college"
    t.string   "year"
    t.string   "netid"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  	end
  end
end
