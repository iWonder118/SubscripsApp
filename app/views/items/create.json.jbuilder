json.id            @item.id
json.title         @item.title
json.link          @item.link
json.color         @item.color
json.plan          @item.plan
json.price         @item.price
json.private       @item.private
json.period_long   @item.payment.period_long
json.period_unit   @item.payment.period_unit
json.first_payment @item.payment.first_payment.strftime("%Y/%m/%d %H:%M")
json.description   @item.payment.description