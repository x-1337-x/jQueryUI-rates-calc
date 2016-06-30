console.log('i am common.js');

$(document).ready(function() {

  /*========calc=========*/
    var rates = { 
      "USD" : 10,
      "EURO" : 15,
      "RUR": 5,
    };

    var currency = 1,
        amount = 100,
        time = 1,
        income;

    function calcIncome() {
      var income = parseInt((amount / 100 * getRate(currency)) * time + getBonus(time));
      console.log(income);
      return income;
    }


    function getRate(currency) {
      return rates[currency];
    }


    function getBonus(time) {
      if (time <= 12) {
        return amount * 0.02;
      } else if (time <= 24) {
        return amount * 0.15;
      } else if (time <= 48) {
        return amount * 0.25;
      } else if (time <= 60) {
        return amount * 0.3;
      } else {
        return amount * 0.6;
      }
    }

  /*=====================*/

  function getCurrency(value){
    if(value === 1) {
      return "EURO";
    } else if(value === 2) {
      return "USD";
    } else if (value === 3) {
      return "RUR";
    }
  }

  $("#currency").slider({ 
    min: 1,
    max: 3,
    value: currency,
    create: function(event, ui) {
      $("#currency-value").html(getCurrency($(this).slider('value')));
      currency = getCurrency($(this).slider('value'));
      $("#income").html(calcIncome());
    },
    change: function(event, ui) {
      currency = 0;
      $("#currency-value").html(getCurrency($(this).slider('value')));
      currency = getCurrency($(this).slider('value'));
      $("#income").html(calcIncome());
    },
    stop: function(event, ui) {
      currency = 0;
      $("#currency-value").html(getCurrency($(this).slider('value')));
      currency = getCurrency($(this).slider('value'));
      $("#income").html(calcIncome());
    }
  });

  $("#amount").slider({
    min:100,
    max:100000,
    value: amount,
    create: function(event, ui) {
      $("#amount-value").html($(this).slider('value'));
      amount = $(this).slider('value');
      $("#income").html(calcIncome());
    },
    slide: function(e, ui) {
      amount = 0;
      $("#amount-value").html($(this).slider('value'));
      amount = $(this).slider('value');
      $("#income").html(calcIncome());
    },
    stop: function(event, ui) {
      amount = 0;
      $("#amount-value").html($(this).slider('value'));
      amount = $(this).slider('value');
      $("#income").html(calcIncome());
    } 
  });

  $("#timeSpan").slider({
    min: 1,
    max: 120,
    value: time,
    create: function(event, ui) {
      $("#timeSpan-value").html($(this).slider('value'));
      time = $(this).slider('value');
      $("#income").html(calcIncome());
    },
    slide: function(e, ui) {
      time = 0;
      $("#timeSpan-value").html($(this).slider('value'));
      time = $(this).slider('value');
      $("#income").html(calcIncome());
    },
    stop: function(event, ui) {
      time = 0;
      $("#timeSpan-value").html($(this).slider('value'));
      time = $(this).slider('value');
      $("#income").html(calcIncome());
    }
  });

  $(".slider").slider({
    change: function(e, ui) {
      var total = calcIncome() + amount;
      $('#amount-graph').width(amount/total*100 + '%').text("Deposit: " + amount);
      $('#summary-graph').width(100 + '%').text("Total: " + total);
    }
  });

});