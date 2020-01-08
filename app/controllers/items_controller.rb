class ItemsController < ApplicationController

  def index
    @item = Item.new
    @item.build_payment
    @items = Item.all
  end

  def create
    item = params.require(:item).permit(:title)
    Item.create(item)
    redirect_to :root
  end

end