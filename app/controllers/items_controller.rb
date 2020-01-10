class ItemsController < ApplicationController
  before_action :set_item, only: [:index]

  def index
    @items = Item.includes(:payment).where(user_id: current_user.id)
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      respond_to do |format|
        format.json
      end
    else
      redirect_to :root
    end
  end

  def delete
    
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