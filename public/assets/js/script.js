let resetBtn = document.getElementById('reset')
let scoreJoueur = document.getElementById('score-joueur')
let scoreOrdinateur = document.getElementById('score-ordinateur')
let btnJoueur = [...document.getElementsByClassName('btn-joueur')]
let oOrBtn = document.getElementById('oor')
let oRougeBtn = document.getElementById('orouge')
let oNoirBtn = document.getElementById('oNoir')
let message = document.getElementById('message')
let nextBtn = document.getElementById('next')

const jouerManche = (e) => {
  let choix = e.target.closest('.btn-joueur')

  btnJoueur.forEach((btn) => {
    btn.classList.add('desactivated')
    btn.removeEventListener('click', jouerManche)
  })

  choix.classList.remove('desactivated')
  choix.classList.add('active')

  let choixJoueur = choix.id

  let choixOrdi = faireChoixOridnateur()

  verifierGagnant(choixJoueur, choixOrdi)

  nextBtn.style.visibility = 'visible'
}

const OR = 'or'
const ROUGE = 'rouge'
const NOIR = 'noir'

const faireChoixOridnateur = () => {
  // 0 = pierre
  // 1 = feuille
  // 2 = ciseaux

  let nbAleatoire = Math.floor(Math.random() * 3)

  switch (nbAleatoire) {
    case 0:
      oOrBtn.classList.add('active')
      return OR
    case 1:
      oRougeBtn.classList.add('active')
      return ROUGE
    default:
      oNoirBtn.classList.add('active')
      return NOIR
  }
}

const verifierGagnant = (choixJoueur, choixOrdi) => {
  if (choixJoueur == choixOrdi) {
    message.textContent = 'Egalité !'
    return
  }

  if (choixJoueur == OR) {
    if (choixOrdi == ROUGE) {
      return victoireOrdinateur()
    } else if (choixOrdi == NOIR) {
      return victoireJoueur()
    }
  }

  if (choixJoueur == ROUGE) {
    if (choixOrdi == NOIR) {
      return victoireOrdinateur()
    } else if (choixOrdi == OR) {
      return victoireJoueur()
    }
  }

  if (choixJoueur == NOIR) {
    if (choixOrdi == OR) {
      return victoireOrdinateur()
    } else if (choixOrdi == ROUGE) {
      return victoireJoueur()
    }
  }
}

const victoireOrdinateur = () => {
  message.textContent = "L'ordinateur gagne..."
  scoreOrdinateur.textContent++
}

const victoireJoueur = () => {
  message.textContent = 'Vous avez gagné ! :)'
  scoreJoueur.textContent++
}

const preparerNouvelleManche = () => {
  btnJoueur.forEach((btn) => {
    btn.classList.remove('desactivated')
    btn.classList.remove('active')

    btn.addEventListener('click', jouerManche)
  })

  nextBtn.style.visibility = 'hidden'

  opierreBtn.classList.remove('active')
  ofeuilleBtn.classList.remove('active')
  ociseauxBtn.classList.remove('active')

  message.textContent = 'A vous de jouer !'
}

nextBtn.addEventListener('click', preparerNouvelleManche)

btnJoueur.forEach((btn) => btn.addEventListener('click', jouerManche))

resetBtn.addEventListener('click', () => {
  scoreJoueur.textContent = 0
  scoreOrdinateur.textContent = 0

  preparerNouvelleManche()
})
