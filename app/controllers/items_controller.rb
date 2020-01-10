class ItemsController < ApplicationController
  before_action :set_item, only: [:index]

  def index
    @items = Item.all
  end

  def create
    @item = Item.create(item_params)
    redirect_to :root
  end

private

  def item_params
    params.require(:item).permit(:title, :link, :color, :plan, :price, :private,
                                payment_attributes:[:id, :period_long, :period_unit, :first_payment, :pay_method, :description]).merge(user_id: current_user.id)
  end

  def set_item
    @item = Item.new
    @item.build_payment
  end

end