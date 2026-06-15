import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
// Importe les images optimisées depuis assets/
import iconChat     from '../../assets/icon-chat.webp'   // converti en .webp pour le poids (green code)
import iconMoney    from '../../assets/icon-money.webp'
import iconSecurity from '../../assets/icon-security.webp'

function Home() {
  return (
    // Le fragment <> </> = évite un div inutile autour de tout
    <>
      <Navbar />       { /* La Nav est réutilisable : 1 ligne au lieu de tout recopier // */}
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account today!</p>
          </section>
        </div>

        <section className="features">
          <h2 className="sr-only">Features</h2>
                       { /* Chaque feature-item est identique  idéal pour un composant FeatureItem */}
          <div className="feature-item">
            <img src={iconChat} alt="Chat"
              className="feature-icon"/>
            <h3 className="feature-item-title">
              You are our #1 priority
            </h3>
            <p>24/7 chat support.</p>
          </div>
                      { /* répète pour icon-money et icon-security avec leur texte */}
          
          <div className="feature-item">
            <img src={iconMoney} alt="Money"
              className="feature-icon"/>
            <h3 className="feature-item-title">
              More savings means higher rates
            </h3>
            <p>The more you save with us, the higher your interest rate will be!</p>
          </div>

          <div className="feature-item">
            <img src={iconSecurity} alt="Security"
              className="feature-icon"/>
            <h3 className="feature-item-title">
              Security you can trust
            </h3>
            <p>We use top of the line encryption to make sure your data and money is always safe.</p>
          </div>

        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home