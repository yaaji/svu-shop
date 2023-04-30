
document.addEventListener("DOMContentLoaded", () => {
    updateCart();
    if( getCart().length > 0){
        showInfo("Your cart already has " + cart.length + " items!");
    }

    updateCartTable();
    updateCartList();
    initInfo();
  });

function buy(code){
    
    cart = getCart();
    
    if( cart.includes(code) ){
        showInfo("<b>" + code + "</b> is already in your cart!");
    }
    else{
        cart.push(code);
        sessionStorage.cart = cart;
        showInfo("<b>" + code + "</b> was added to your cart.");
    }

    updateCart();
    
}

function cancel(code){
    cart = getCart();
    cart = cart.filter(function(i){ return i != code});
    sessionStorage.cart = cart;

    updateCart();
    updateCartTable();
}

function initInfo(message){
    info = document.getElementById("info");
    if( info != null){
        info.style.display = 'none';
    }
}

function showInfo(message){
    info = document.getElementById("info");
    if( info != null){
        info.innerHTML = message;
        info.style.display = 'block';
    }
}

function updateCart(){
    badge = document.getElementById("cart-badge");
    badge.classList.add("bg-warning");
    badge.innerHTML = getCart().length;
}

function getCart(){
    cart = sessionStorage.cart;
    if( sessionStorage.cart == null || sessionStorage.cart == ""){
        cart = [];
    }
    else{
        cart = sessionStorage.cart.split(",");
    }
    return cart;
}

function updateCartTable(){
    table = document.getElementById("cart-table");
    total = document.getElementById("total");
    

    if( table != null){
        cart = getCart();
        table.innerHTML = "";

        for( i=0; i < cart.length; i++ ){
            table.innerHTML +=
                "<tr>" +
                "<th scope='row'>" + (i+1) +"</th>" +
                "<td>" + cart[i] + "</td>" +
                "<td>" + getTitle(cart[i]) + "</td>" +
                "<td> $ 200 </td>" +
                "<td><button class='btn btn-outline-secondary btn-sm' onclick='cancel(\"" + cart[i] + "\")'>&times;</button></td>"
                "</tr>";
        }

        total.innerHTML = "<b>$ " + (cart.length * 200) + "</b>";

    }
}


function updateCartList(){
    list = document.getElementById("cart-list");
    badge = document.getElementById("cart-list-badge");
    if( list != null){
        cart = getCart();
        list.innerHTML = "";

        for( i=0; i < cart.length; i++ ){
            list.innerHTML +=
                '<li class="list-group-item d-flex justify-content-between lh-sm">'+
                '<div>'+
                '  <h6 class="my-0">' + cart[i] + '</h6>'+
                '  <small class="text-body-secondary">' + getTitle(cart[i]) +  '</small>'+
                '</div>'+
                '<span class="text-body-secondary">$200</span>'+
                '</li>';
        }

        console.log(sessionStorage.discount);

        if( sessionStorage.discount == -0.5){
            
            list.innerHTML +=
                '<li class="list-group-item d-flex justify-content-between bg-body-tertiary">'+
                '<div class="text-success">'+
                '  <h6 class="my-0">PROMO CODE</h6>'+
                '  <small class="text-body-secondary">MCS</small>'+
                '</div>'+
                '<span class="text-body-secondary">' + (cart.length * 200 * sessionStorage.discount ) + '</span>'+
                '</li>';
            
            list.innerHTML += 
                '<li class="list-group-item d-flex justify-content-between">'+
                '    <span>Total (USD)</span>'+
                '    <strong> $' + ((cart.length * 200) + (cart.length * 200 * sessionStorage.discount ))  + '</strong>'+
                '</li>';
        }
        else{
            list.innerHTML += 
                '<li class="list-group-item d-flex justify-content-between">'+
                '    <span>Total (USD)</span>'+
                '    <strong> $' + (cart.length * 200) +  + '</strong>'+
                '</li>';

        }

        

        badge.innerHTML = cart.length;
    }
}

function redeem(){
    code = document.getElementById("promo-code");

    if( code != null && code.value == "MCS") {
        sessionStorage.discount = -0.5;
    }
    else{
        alert("Invalid discount code!")
    }

}

function getTitle(code){
    switch( code){
        case "WP1": return "Web Programming 1";
        case "DBS": return "Database Systems";
        case "PRB": return "Programming Basics";
        case "STP": return "Principles of Statistics";
        case "NTP": return "Computer Networks & Protocols";
    }

}
