//Imposta i cookies per consentire al codice ASP di accedere alle dimensioni dello schermo
var cw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
document.cookie = 'ThisPageWidth=' + cw;
var ch = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
document.cookie = 'ThisPageHeight=' + ch;

document.getElementsByClassName = function (cl) {
    var retnode = [];
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) {
        if ((' ' + elem[i].className + ' ').indexOf(' ' + cl + ' ') > -1)
            retnode.push(elem[i]);
    }
    return retnode;
};

function Toggle_iFrame(ObjectID, URL, State)	// State: 1=visible, 0=hidden
{
    if (document.getElementById)					//gecko(NN6) & IE 5+
    {
        var obj = document.getElementById(ObjectID);
        obj.style.visibility = State ? "visible" : "hidden";
        obj.src = URL;
    } else if (document.all) // IE 4
    {
        document.all[ObjectID].style.visibility = State ? "visible" : "hidden";
        document.all[ObjectID].src = URL;
    }
}

function toggleMe(a) {
    var e = document.getElementById(a);
    if (!e)
        return true;
    if (e.style.display == "none") {
        e.style.display = "block"
    } else {
        e.style.display = "none"
    }
    return true;
}

function scrollElmVert(el, num)  // to scroll up use a negative number
{
    var re = /html$/i;
    while (!re.test(el.tagName) && (1 > el.scrollTop))
        el = el.parentNode;
    if (0 < el.scrollTop)
        el.scrollTop += num;
}

function ReverseDisplay(d) {
    var e = document.getElementById(d);
    var divs = document.getElementsByClassName('msgdiv');
    //for(var i = 0; i < divs.length; i++){divs[i].style.display = "none";}
    for (var i = 0; i < divs.length; i++) {
        if (divs[i].id != e.id) {
            divs[i].style.display = "none";
        }
    }
    if (e.style.display == "none") {
        e.style.display = "block";
        e.scrollIntoView();
        scrollElmVert(e, -40);
    } else {
        e.style.display = "none";
    }
}
