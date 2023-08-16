function reveal() {
  for (let e = document.querySelectorAll('.reveal'), t = 0; t < e.length; t++) {
    e[t].getBoundingClientRect().top < window.innerHeight ? e[t].classList.add('active') : e[t].classList.remove('active')
  }
}

window.addEventListener('scroll', reveal), reveal()
