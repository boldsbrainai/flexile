# frozen_string_literal: true

module MockTableHelpers
  def create_mock_model(name: "MockModel", constantize: true, &block)
    table_name = "#{name.tableize}_#{SecureRandom.hex}"
    model = Class.new(ApplicationRecord)
    model.define_singleton_method(:name) { name }
    model.table_name = table_name
    if block_given?
      ActiveRecord::Base.connection.create_table(table_name, &block)
    else
      create_mock_table(model)
    end
    Object.const_set(name, model) if constantize && !Object.const_defined?(name)
    model
  end

  def create_mock_table(model)
    ActiveRecord::Base.connection.create_table(model.table_name) do |t|
      t.integer :user_id
      t.string :title
      t.string :subtitle
      t.timestamps null: false
    end
    model.belongs_to(:user, optional: true)
  end

  def drop_table(table_name)
    ActiveRecord::Base.connection.drop_table(table_name)
  end

  def destroy_mock_model(model)
    drop_table(model.table_name)
  rescue ActiveRecord::StatementInvalid => e
    return if e.cause.is_a?(Mysql2::Error) && e.message.include?("Unknown table")
    raise
  ensure
    Object.send(:remove_const, model.name) if Object.const_defined?(model.name)
  end
end
