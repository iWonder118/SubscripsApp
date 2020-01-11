class ItemsController < ApplicationController
  before_action :set_item, only: [:edit, :update, :destroy]

  def index
    @item = Item.new
    @item.build_payment
    @items = Item.includes(:payment).where(user_id: current_user.id)
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      respond_to do |format|
        format.json
      end
    else
      redirect_to root_path
    end
  end

  def edit

  end

  def update
    if @item.update(item_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    if @item.destroy
      respond_to do |format|
        format.json 
      end
    else
      redirect_to root_path
    end
    
  end

private

  def item_params
    params.require(:item).permit(:title, :link, :color, :plan, :price, :private,
                                payment_attributes:[:id, :period_long, :period_unit, :first_payment, :pay_method, :description]).merge(user_id: current_user.id)
  end

  def set_item
    @item = Item.find(params[:id])
  end
end