function GenMap(map_width, map_height) {
	var map_content;
	var map_block_status;
	var map_block_id = 1;

	map_content = "";
	for (var i = 0; i < map_height; i++)
	{
		map_content += "<div class=\"row\" id=\""+i+"_row\" >";
		for (var j = 0; j < map_width; j++)
		{
			if (j == 0)
				for (var k = (map_height - i - 1); k > 0; k--)
				{
					map_content +="<div class=\"map_void";
					if (k == 1)
						map_content +=" map_last_void";
					map_content +="\"></div>";
				};
			map_block_status = "nothing";
			if (j < (map_width/3))
			{
				map_block_human++;
				map_block_status = "human";
			}
			else if (j >= (map_width/3) * 2)
			{
				map_block_nature++;
				map_block_status = "nature";
			}
			map_content += "<div class=\""+ j +"_block map_block "+ map_block_status +"\" id=\"" + map_block_id +"\"></div>";				map_block_id++;
		}
		for (var l = i; l > 0; l--)
		{
			map_content +="<div class=\"map_void";
			if (l == i)
				map_content +=" map_first_void";
			map_content +="\"></div>";
		}
		map_content += " </div>";
	}
	map_block_nothing = map_block_id - 1 - map_block_human - map_block_nature;
	$("div#div_map").css("width", ((map_width + map_height - 1) * 84) + "px")
	$("div.web_center_block").css("width", ((map_width + map_height - 1) * 84) + "px")
	document.getElementById("div_map").innerHTML = map_content;
}