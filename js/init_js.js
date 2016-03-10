// ==== Initialisation =====
var map_width_tmp = prompt("Taille De la Map: ", "Longeur");
var map_height_tmp = prompt("Taille De la Map: ", "Hauteur");
if (map_width_tmp != null && map_width_tmp != undefined &&
	map_height_tmp != null && map_height_tmp != undefined)
{
	var map_width = parseInt(map_width_tmp);
	var map_height = parseInt(map_height_tmp);
}
else
{
	var map_width = 8;
	var map_height = 5;
}
var You_Are = "human";

// ======= In Game ========
var game;
var last_block_selected = -1;
var last_possible = -1;
var select_aura = 4;
var last_liste;

// ========= Map =========
GenMap(map_width, map_height);