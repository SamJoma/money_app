class MonthlyBudgetSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id
  has_many :category_budgets

end
