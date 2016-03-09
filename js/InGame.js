$(document).ready(function()
{
	var game;
	var last_block_selected = -1;
	var last_possible = -1;

	function selectxy(id, char)
	{
		var x = (id%map_width) - 1;
		var y = parseInt(id/map_width);
		if (x < 0)
		{
			x = map_width - 1;
			y--;
		}
		if (char == "y")
			return (y);
		return(x);
	}
	function ZonneSeleted(div) {
		if (last_possible >= 0 &&
			parseInt(div.attr("id")) != last_possible)
		{
			selectcircle(last_possible, 4);
			$("div.map_block#" + last_possible).toggleClass("possible");
		}
		div.toggleClass("possible");
		selectcircle(parseInt(div.attr("id")), 4);
		if (div.hasClass("possible"))
			last_possible = parseInt(div.attr("id"));
		else
			last_possible = -1;
	}
	function selectcircle(id, rond)
	{
		var x = selectxy(id , "x");
		var y = selectxy(id , "y");
		for (var i = rond; i > 0; i--)
		{
			$("div.row#"+(y)+"_row").find("div."+(x - i)+"_block").toggleClass("possible");
			$("div.row#"+(y)+"_row").find("div."+(x + i)+"_block").toggleClass("possible");
			$("div.row#"+(y + i)+"_row").find("div."+(x)+"_block").toggleClass("possible");
			$("div.row#"+(y - i)+"_row").find("div."+(x)+"_block").toggleClass("possible");
			for (var j = rond; j > 0; --j)
			{
				if (i > j)
				{
					$("div.row#"+(y - (i - j))+"_row").find("div."+(x + j)+"_block").toggleClass("possible");
					$("div.row#"+(y + (i - j))+"_row").find("div."+(x + j)+"_block").toggleClass("possible");
					$("div.row#"+(y - (i - j))+"_row").find("div."+(x - j)+"_block").toggleClass("possible");
					$("div.row#"+(y + (i - j))+"_row").find("div."+(x - j)+"_block").toggleClass("possible");
				}
			};
		}
	}
	function initPlayer()
	{
		switch (You_Are) {
			case "human":
				game = "HumanPlay";
				$("div#HumanPlay").show();
				$("div#NaturePlay").hide();
				break;
			default:
				game = "NaturePlay";
				$("div#HumanPlay").hide();
				$("div#NaturePlay").show();
				break;
		}
	}
	function actualiseScore()
	{
		document.getElementById("div_score").innerHTML = "Nature: " + map_block_nature + " cases</br>Human: " + map_block_human + " cases</br>" + map_block_nothing + " cases a prendre";
	}
	function switchPlayer()
	{
		switch (You_Are) {
			case "nature":
				You_Are = "human";
				break;
			default:
				You_Are = "nature";
				break;
		}
		actualiseScore();
		initPlayer();
	}

	$("button").click(function(){
		$("button.active").toggleClass("active");
		$(this).toggleClass("active");
	});

	$("div.map_block").click(function()
	{
		map_block_status = $(this).attr('class').split(" ")[2];
		if (map_block_status == You_Are)
		{
			ZonneSeleted($(this));
			if (last_block_selected > 0)
				$("div#" + last_block_selected).toggleClass("selected");
			last_block_selected = $(this).attr("id");
			$(this).toggleClass("selected");
			$("div.action").show();
		}
		else if ($("button.attaque").hasClass("active") && $(this).hasClass("possible"))
		{
			ZonneSeleted($("div.map_block#" + last_possible));
			switch (map_block_status)
			{
				case "nature":
					$(this).removeClass(map_block_status);
					$(this).addClass("nothing");
					map_block_nature--;
					map_block_nothing++;
					break;
				case "human":
					$(this).removeClass(map_block_status);
					$(this).addClass("nothing");
					map_block_human--;
					map_block_nothing++;
					break;
				default:
					$(this).removeClass(map_block_status);
					$(this).addClass(You_Are);
					map_block_nothing--;
					switch (You_Are)
					{
						case "nature":
							map_block_nature++;
							break;
						case "human":
							map_block_human++;
							break;
					}
					break;
			}
			if (last_block_selected > 0)
				$("div#" + last_block_selected).removeClass("selected");;
			$("div.action").hide();
			$("button.attaque").removeClass("active");
			switchPlayer();
		}
	});
	initPlayer();
});