<template>
  <div class="landing-page">
    <section class="hero-background">
      <h1>BentoBox</h1>
      <h2>Thousands of kids in American schools have unpaid school lunch balances.</h2>
      <h2>Help ease the burden for these students and their families.</h2>
    </section>

    <div class="container">
      <section class="card">
        <div class="card__media">
          <div id="map"></div>
        </div>

        <footer class="card__actions">
          <nuxt-link tag="button" class="primary"
            to="/schools">
            List of schools
          </nuxt-link>
        </footer>
      </section>
    </div>
    <div class="flex row container">
      <div class="main card">
        <div class="card__header">
          <h2>Our Story?</h2>
        </div>

        <div class="card__content">
          <p>It all started with a tweet -- one simple tweet asking for people across the country to contact their local schools and ask if there were students with school lunch balances and how they could help pay the balances off for those students.</p>
          <p>I answered the call and was surprised by just how many schools in my own community and beyond have students with balances. Thousands and thousands of dollars. As a concerned community member who is committed helping kids, I jumped at the opportunity to lessen the burden for some of these students and working families.</p>
        </div>
      </div>
      <div class="secondary card">
        <div class="card__header">
          <h2>Why?</h2>
        </div>

        <div class="card__content">
					<p>Or maybe we should be asking how. How is it that the richest and most powerful nation in the world has thousands of kids in its schools unable to afford to pay for breakfast or lunch?</p>
          <p>When it comes to the biggest challenges our communities face, so few software developers and technologists are tackling the basic issues that matter most.</p>
        </div>
      </div>

    </div>
    <div class="flex column container">
      <div class="card">
        <div class="card__header">
          <h2>Where?</h2>
        </div>

        <div class="card__content">
          <p>We currently allow schools all over the country to share their unpaid lunch balances with us, and we provide donors the ability to contribute directly to the schools.</p>
        </div>

        <div class="card__actions">
          <nuxt-link tag="button" class="primary"
            to="/create">
            Host your school
          </nuxt-link>
          <nuxt-link tag="button" class="primary"
            to="/schools">
            Contact a local school
          </nuxt-link>
        </div>
      </div>
    </div>
    <footer class="site-footer">
      <div class="container flex column">
        <div class="social-links">
          <a class="github" href="https://github.com/bentoboxschools">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H14.85C14.5,21.92 14.5,21.24 14.5,21V18.26C14.5,17.33 14.17,16.72 13.81,16.41C16.04,16.16 18.38,15.32 18.38,11.5C18.38,10.39 18,9.5 17.35,8.79C17.45,8.54 17.8,7.5 17.25,6.15C17.25,6.15 16.41,5.88 14.5,7.17C13.71,6.95 12.85,6.84 12,6.84C11.15,6.84 10.29,6.95 9.5,7.17C7.59,5.88 6.75,6.15 6.75,6.15C6.2,7.5 6.55,8.54 6.65,8.79C6,9.5 5.62,10.39 5.62,11.5C5.62,15.31 7.95,16.17 10.17,16.42C9.89,16.67 9.63,17.11 9.54,17.76C8.97,18 7.5,18.45 6.63,16.93C6.63,16.93 6.1,15.97 5.1,15.9C5.1,15.9 4.12,15.88 5,16.5C5,16.5 5.68,16.81 6.14,17.97C6.14,17.97 6.73,19.91 9.5,19.31V21C9.5,21.24 9.5,21.92 9.14,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2Z" /></svg>
          </a>
          <a class="twitter" href="https://twitter.com/bentoboxschools">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17.71,9.33C17.64,13.95 14.69,17.11 10.28,17.31C8.46,17.39 7.15,16.81 6,16.08C7.34,16.29 9,15.76 9.9,15C8.58,14.86 7.81,14.19 7.44,13.12C7.82,13.18 8.22,13.16 8.58,13.09C7.39,12.69 6.54,11.95 6.5,10.41C6.83,10.57 7.18,10.71 7.64,10.74C6.75,10.23 6.1,8.38 6.85,7.16C8.17,8.61 9.76,9.79 12.37,9.95C11.71,7.15 15.42,5.63 16.97,7.5C17.63,7.38 18.16,7.14 18.68,6.86C18.47,7.5 18.06,7.97 17.56,8.33C18.1,8.26 18.59,8.13 19,7.92C18.75,8.45 18.19,8.93 17.71,9.33M20,2H4A2,2 0 0,0 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z" /></svg>
          </a>
        </div>
        <div class="copy-right">© BentoBox, Inc.</div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'landing-page',
  mounted () {
    var uluru = {lat: 34.043, lng: -118.244};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: uluru
    });
  }
}
</script>

<style scoped>
#map {
  height: 20em;
  width: 100%;
  background-color: #ddd;
}
.landing-page {
  background-color: #f3f3f3;
}
.hero-background {
  height: 40em;
  width: 100%;
  color: #fff;
  background-color: #009688;
  background-image: url('~assets/food.svg');
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1em;
  padding: 1em;
}

.hero-background h1,
.hero-background h2 {
  text-shadow: #333 0 2px 10px;
  line-height: 1.5em;
}
.hero-background h1 {
  font-size: 64px;
  font-weight: 900;
  letter-spacing: 0.3em;
}

.card .card__header h2 {
  letter-spacing: 0.3em;
  border-bottom: 1px solid #e3e3e3;
}
.flex.row .card:not(:last-of-type) {
  margin-right: 1em;
}
.flex.row .main {
  flex: 1.6;
}
.flex.row .secondary {
  flex: 1;
}

.site-footer {
  background-color: #fff;
  padding: 0 2em;
}
.social-links {
  align-self: flex-end;
  margin-top: 3em;
  margin-bottom: 2em;
}
.social-links svg {
  width: 3em;
  height: 3em;
}
.social-links a.twitter {
  fill: #1da1f2;
}
.social-links a.github {
  fill: #333;
}
.copy-right {
  margin-bottom: 2em;
}

@media (max-width: 600px) {
  .hero-background {
    height: 42em;
  }

  .hero-background h1 {
    font-size: 42px;
  }

  .card {
    margin-left: 1em;
    margin-right: 1em;
  }
  .flex.row {
    flex-direction: column;
  }
}
</style>
