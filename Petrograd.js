window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);
    visProdukt();
}

function visProduktListe( listen ) {
    console.table( listen );
    listen.forEach( visProdukt )
}

function visProdukt( produkt ) {
    var klon = document.querySelector(".produkt_template").content.cloneNode(true);

    document.querySelector(".produkt_liste").appendChild(klon);
}
