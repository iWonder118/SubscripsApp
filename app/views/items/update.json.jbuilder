json.id            @item.id
json.uid           current_user.id
json.title         @item.title
json.link          @item.link
json.color         @item.color
json.plan          @item.plan
json.price         @item.price
json.private       @item.private
json.period_long   @item.payment.period_long
json.period_unit   @item.payment.period_unit
json.first_payment @item.payment.first_payment
json.pay_method    @item.payment.pay_method
json.description   @item.payment.description