window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);
}

function visProduktListe( listen ) {
    console.table( listen );
    listen.forEach( visProdukt )
}

function visProdukt( produkt ) {
    var klon = document.querySelector(".produkt_template").content.cloneNode(true);

    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris+" DKK";

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris*produkt.rabatsats/100));
    klon.querySelector(".data_rabat").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/imgs/small/" + produkt.billede + "-sm.jpg";

    if(produkt.udsolgt == false) {
        var udsolgttekst = klon.querySelector(".udsolgt");
        udsolgttekst.parentNode.removeChild( udsolgttekst );
    }

    document.querySelector(".produkt_liste").appendChild(klon);
}
