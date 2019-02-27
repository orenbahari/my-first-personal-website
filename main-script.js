AOS.init({
    duration: 1200,
    once: true,
});

$('#button-1').click(function() {
    if(this.checked != true){
        $("#conditional-11").hide();
        $(".star .read-more").html("Read Less").css({background: '#243299'});
        $("#conditional-12").show();
    }
    else{
        $("#conditional-11").show();
        $(".star .read-more").html("Read More").css({background: '#e87da9'});
        $("#conditional-12").hide();
    }
});

$('#button-2').click(function() {
    if(this.checked != true){
        $("#conditional-21").hide();
        $(".pizza .read-more").html("Read Less").css({background: '#243299'});
        $("#conditional-22").show();
    }
    else{
        $("#conditional-21").show();
        $(".pizza .read-more").html("Read More").css({background: '#e87da9'});
        $("#conditional-22").hide();
    }
});

$('#button-3').click(function() {
    if(this.checked != true){
        $("#conditional-31").hide();
        $(".fig .read-more").html("Read Less").css({background: '#243299'});
        $("#conditional-32").show();
    }
    else{
        $("#conditional-31").show();
        $(".fig .read-more").html("Read More").css({background: '#e87da9'});
        $("#conditional-32").hide();
    }
});

$('#button-4').click(function() {
    if(this.checked != true){
        $("#conditional-41").hide();
        $(".nandos .read-more").html("Read Less").css({background: '#243299'});
        $("#conditional-42").show();
    }
    else{
        $("#conditional-41").show();
        $(".nandos .read-more").html("Read More").css({background: '#e87da9'});
        $("#conditional-42").hide();
    }
});