function reveal() {
    for (var e=document.querySelectorAll(".reveal"), t=0; t<e.length; t++) {
        var l = window.innerHeight;
        e[t].getBoundingClientRect().top<l-200?e[t].classList.add("active"):e[t].classList.remove("active")
    }
}

window.addEventListener("scroll", reveal), reveal()