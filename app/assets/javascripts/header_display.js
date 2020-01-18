$(document).on('turbolinks:load', function () {
  $(function () {
    let price_ids = new Array();
    let item_prices = {};

    function changeYen(num) {
      return '¥' + String(num).split("").reverse().join("").match(/\d{1,3}/g).join(",").split("").reverse().join("");
    }
    //ページ読み込み時にヘッダーの利用サービス数と合計金額を表示する処理
    $('p[data-price]').each(function () {
      price_ids.push($(this).data('price'));
    });

    price_ids.forEach(function (price_id) {
      item_prices[price_id] = $('p[data-price=' + price_id + ']').text().replace(/[^0-9]/g, '');
    })

    let total_service = price_ids.length;
    let total_fee = 0;

    for (let id in item_prices) {
      total_fee += Number(item_prices[id]);
    }

    $('#total_service').text(total_service);
    $('#total_fee').text(changeYen(total_fee));
  });
});