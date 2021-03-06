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
    klon.querySelector(".data_kategori").innerHTML = produkt.kategori;
    klon.querySelector(".data_beskrivelse").innerHTML = produkt.kortbeskrivelse;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris*produkt.rabatsats/100));
    klon.querySelector(".data_rabat").innerHTML = rabatpris+" DKK";

    if(produkt.rabatsats == 0) {
        var rabatpris = klon.querySelector(".data_rabat");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }

    klon.querySelector('button').dataset.id = produkt.id;
    klon.querySelector('button').addEventListener('click', knapKlikket);


    document.querySelector(".produkt_liste").appendChild(klon);
}


function knapKlikket(oplysningOmEventet){
    var produktId = oplysningOmEventet.target.dataset.id;

    $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?&id="+produktId, visModalIndhold);
}

function visModalIndhold(mereInfo) {
    console.log(mereInfo);
    document.querySelector('#myModalLabel').textContent = mereInfo.navn;
    document.querySelector('.data_langB').textContent = mereInfo.langbeskrivelse;
    document.querySelector('.data_billede').src = "/imgs/small/" + mereInfo.billede + "-sm.jpg";


    if(mereInfo.vegetar == false) {
    var vegetartekst = document.querySelector(".data_vegetar");
    vegetartekst.parentNode.removeChild(vegetartekst);
    }

    if(mereInfo.udsolgt == false) {
        var udsolgttekst = document.querySelector(".udsolgt");
        udsolgttekst.parentNode.removeChild(udsolgttekst);
    }
}

