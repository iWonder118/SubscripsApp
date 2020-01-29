class ItemsController < ApplicationController
  # ログイン済ユーザーのみにアクセスを許可する
  before_action :authenticate_user!, except: [:show]

  before_action :set_item, only: [ :update, :destroy]
  before_action :set_share, only: [ :show]

  after_action :reset_row_order, only: [:sort, :create, :update]

  def index
    @item = Item.new
    @item.build_payment
    @items = Item.rank(:row_order).includes(:payment).where(user_id: current_user.id)
  end

  def show
    if @share.release 

    else
      redirect_to root_path
    end
  end

  def create
    @item = Item.new(item_params.merge(row_order_position: :last))
    if @item.save
      respond_to do |format|
        format.json
      end
    else
      redirect_to root_path
    end
  end

  def update
    if @item.update(item_params)
      respond_to do |format|
        format.json
      end
    else
      redirect_to root_path
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

  def sort
    if @item = Item.update_attribute(params.requier(:item).permit(:row_order_position))
      render body: nil 
    else
      render body: nil 
    end
  end

private

  def item_params
    params.require(:item).permit(:title, :link, :color, :plan, :price, :release,
                                payment_attributes:[:id, :period_long, :period_unit, :first_payment, :pay_method, :description]).merge(user_id: current_user.id)
  end

  def set_item
    @item = Item.includes(:payment).find(params[:id])
  end

  def set_share
    @share = Item.find(params[:id])
  end

  def reset_row_order
    Item.rank(:row_order).each_with_index do |item, i|
    item.update_attribute(:row_order, i + 1)
    end
  end
end