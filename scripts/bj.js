$(document).ready(function() {
   //  ф-ция, создающая карту
	function CARD(name, suit, value) {
		this.name = name;
		this.suit = suit;
		this.value = value;
	};
    //  массив - колода карт
	var pack = [new CARD('2', 'Hearts', 2),
				new CARD('3', 'Hearts', 3),
				new CARD('4', 'Hearts', 4),
				new CARD('5', 'Hearts', 5),
				new CARD('6', 'Hearts', 6),
				new CARD('7', 'Hearts', 7),
				new CARD('8', 'Hearts', 8),
				new CARD('9', 'Hearts', 9),
				new CARD('10', 'Hearts', 10),
				new CARD('Valet', 'Hearts', 10),
				new CARD('Dama', 'Hearts', 10),
				new CARD('King', 'Hearts', 10),
				new CARD('Ace', 'Hearts', 11),
				new CARD('2', 'Diamonds', 2),
				new CARD('3', 'Diamonds', 3),
				new CARD('4', 'Diamonds', 4),
				new CARD('5', 'Diamonds', 5),
				new CARD('6', 'Diamonds', 6),
				new CARD('7', 'Diamonds', 7),
				new CARD('8', 'Diamonds', 8),
				new CARD('9', 'Diamonds', 9),
				new CARD('10', 'Diamonds', 10),
				new CARD('Valet', 'Diamonds', 10),
				new CARD('Dama', 'Diamonds', 10),
				new CARD('King', 'Diamonds', 10),
				new CARD('Ace', 'Diamonds', 11),
				new CARD('2', 'Clubs', 2),
				new CARD('3', 'Clubs', 3),
				new CARD('4', 'Clubs', 4),
				new CARD('5', 'Clubs', 5),
				new CARD('6', 'Clubs', 6),
				new CARD('7', 'Clubs', 7),
				new CARD('8', 'Clubs', 8),
				new CARD('9', 'Clubs', 9),
				new CARD('10', 'Clubs', 10),
				new CARD('Valet', 'Clubs', 10),
				new CARD('Dama', 'Clubs', 10),
				new CARD('King', 'Clubs', 10),
				new CARD('Ace', 'Clubs', 11),
				new CARD('2', 'Spades', 2),
				new CARD('3', 'Spades', 3),
				new CARD('4', 'Spades', 4),
				new CARD('5', 'Spades', 5),
				new CARD('6', 'Spades', 6),
				new CARD('7', 'Spades', 7),
				new CARD('8', 'Spades', 8),
				new CARD('9', 'Spades', 9),
				new CARD('10', 'Spades', 10),
				new CARD('Valet', 'Spades', 10),
				new CARD('Dama', 'Spades', 10),
				new CARD('King', 'Spades', 10),
				new CARD('Ace', 'Spades', 11)
	];

	function getRandom(num) {
 		var my_num = Math.floor(Math.random()*num);
 		return my_num;
	}

   // сыгравшие карты - в этом массиве хранятся индексы объектов из массива pack
	var used_cards = new Array();

   //  карты в руке
	var hand = {
		cards : new Array(),
		current_total: 0,
		sumCardsTotal: function() {
			this.current_total = 0;
			for (var i= 0; i< this.cards.length; i++) {
				var c = this.cards[i];
				this.current_total += c.value;
			}
		}
	}

	var pointScored = hand.current_total;

   //  что делает дилер при сдаче карт
	$("#btnDeal").on('click', (function() {
		deal();
 		$(this).toggle();
 		$("#btnStep").toggle();
 		$("#btnStick").toggle();
	}));

    //  взятие карты из колоды
	$("#btnStep").on('click', step);

	//   игрок прекращает брать карты, кликая на джокера
	$("#btnStick").click(function () {
		$('#hdrResult').html("Your RESULT: " + pointScored); 
		$("#btnStep").toggle();
	})

    //  дилер сдает игроку 2 карты
	function deal() {
		for(var i = 0; i < 2; i ++) {
			step();
		}
	};

		//  ход - одно взятие карты из колоды
	function step() {
 		var index = getRandom(52);
 		if( $.inArray(index, used_cards) == -1 ) {
 			var c = pack[index];
 			hand.cards[hand.cards.length] = c;
 			used_cards[used_cards.length] = index;
 			var $appearDiv = $("<div>");
			$appearDiv/*$("<div>")*/.addClass("current_hand").appendTo("#my_hand");
 			$("<img>").appendTo($appearDiv/*".current_hand"*/).attr( "src" , 'images/cards/' + c.suit + '/' + c.name + '.jpg' )
 			.fadeOut('fast')
 			.fadeIn('fast');
 		} else {
 			step();
 		};
 		hand.sumCardsTotal();
 		pointScored = hand.current_total;
	 	$("#hdrTotal").html("Total: "+ pointScored);
		if(pointScored > 21) {
			$("#btnStick").trigger("click"); 	
	 		$("#hdrResult").html("BUST! Your total more then 21!");  
	 	} else if(pointScored == 21) {
	 		$("#btnStick").trigger("click"); 
	 		$("#hdrResult").html("Black Jack!");  
	 	} else if (pointScored <= 21 && hand.cards.length == 5) {
	 		$("#btnStick").trigger("click"); 
	 		$("#hdrResult").html("Your 5 cards won!");
	 	}	
	}
});


