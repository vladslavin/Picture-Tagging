/* Lil tagging thing for static pictures on your website.
Copyright 2010
Vladimir V. Slavin
BSD MileyCyrus Licence
Requires jQuery, however it's so small 
that one can rewrite it without easily.
http://slavin.tv
*/
var options = {
	 tag_url : "tag.png", // url of the tag image
	 width: "40px",
	 height:"40px",
	 offset_x : 14,
	 offset_y : 16,
	 save : function(image_id,image_left,image_top) { 
		$(".reports").append("<li> #" + image_id + ": " + image_left + " " + image_top + "</li>");
	 } // do whatever you want with the data
};
(function() {
$("img").load(function() {
	var pic = $(this);
	
	pic.each(function(i,item) { 
	var pic_item = $(item);
	$("<div class='layer'></div>")
	.css({"top":pic_item.offset().top,
	 	"left":pic_item.offset().left,
		"position":"absolute",
		"z-Index":"9"})
	.width(pic_item.width())
	.height(pic_item.height())
	.attr("id",pic_item.attr("id"))
	.appendTo("body"); });

	$(".layer").click(function(e) {
		var pic_item = $(e.currentTarget);
		var left = e.layerX-options.offset_x, top = e.layerY-options.offset_y;
		
		$("<div class='point'></div>")
		.css({"background-image":"url("+ options.tag_url +")",
			"width": options.width,
			"height":options.height,
			"top":top, "left":left, 
			"position":"absolute",
			"z-Index":"9"})
		.appendTo(pic_item);
		
		options.save(pic_item.attr("id"),left+options.offset_x,top+options.offset_y);
	});
});
})();