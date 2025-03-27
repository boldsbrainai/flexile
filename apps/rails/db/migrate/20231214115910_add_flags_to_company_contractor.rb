class AddFlagsToCompanyContractor < ActiveRecord::Migration[7.1]
  def change
    add_column :company_contractors, :flags, :bigint, default: 0, null: false
  end
end
