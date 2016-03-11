$(document).ready(function()
{
	//AnimImg("button.active", "img/ss.png", 44, 10, 100);
	$("button").click(function(){
		var parent = $(this).parent();
		parent.find("button.active").toggleClass("active");
		$(this).addClass("active");
		if (parent.hasClass("liste_action"))
		{
			$("div.liste_" + last_liste).hide();
			last_liste = $(this).attr('class').split("_")[1].split(" ")[0]
			$("div.liste_" + last_liste).show();
		}
	});

	$("div.map_block").click(function()
	{
		map_block_status = $(this).attr('class').split(" ")[2];
		if (map_block_status == You_Are)
		{
			ZonneSeleted($(this));
			if (last_block_selected > 0)
				$("div#" + last_block_selected).removeClass("selected");
			if (last_block_selected != $(this).attr("id"))
				$(this).toggleClass("selected");
			last_block_selected = $(this).attr("id");
			$("div.liste_action").show();
		}
		else if ($("button.action_attaque").hasClass("active") &&
			($("button.attaque_detruire").hasClass("active") ||
						$("button.attaque_construire").hasClass("active")) &&
			$(this).hasClass("possible"))
		{
			ZonneSeleted($("div.map_block#" + last_possible));
			if ($("button.attaque_detruire").hasClass("active"))
			{
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
				}
				$("button.attaque_detruire").removeClass("active");
			}
			else if ($("button.attaque_construire").hasClass("active") &&
				map_block_status == "nothing")
			{
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
				$("button.attaque_construire").removeClass("active");
			}
			if (last_block_selected > 0)
				$("div#" + last_block_selected).removeClass("selected");
			$("div.liste_action").hide();
			$("div.liste_attaque").hide();
			$("button.action_attaque").removeClass("active");
			switchPlayer();
		}
	});
	initPlayer();
});