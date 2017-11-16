$("document").ready(function(){
    var url = $(location).attr("pathname"),
        navbar = $("#navbar");
    console.log(url);
    console.log(navbar.find("a").attr("href"));
});
