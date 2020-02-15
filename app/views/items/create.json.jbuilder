json.id            @item.id
json.uid           current_user.id
json.title         @item.title
json.link          @item.link
json.color         @item.color
json.plan          @item.plan
json.price         @item.price
json.release       @item.release.to_s
json.period_long   @item.payment.period_long
json.period_unit   @item.payment.period_unit
json.first_payment @item.payment.first_payment
if @item.payment.period_unit == 1
  json.next_payment @item.payment.first_payment.since(@item.payment.period_long.month).strftime("%Y年%m月%d日")
elsif @item.payment.period_unit == 2
  json.next_payment @item.payment.first_payment.since(@item.payment.period_long.week).strftime("%Y年%m月%d日")
else
  json.next_payment @item.payment.first_payment.since(@item.payment.period_long.day).strftime("%Y年%m月%d日")
end
json.pay_method    @item.payment.pay_method
json.fee_per_month @item.price.to_i * 12
json.fee_per_day   @days_fee
json.description   @item.payment.description
json.flash         "作成が完了しました"