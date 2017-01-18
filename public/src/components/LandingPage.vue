<template>
  <div class="landing-page">
    <section class="hero-background">
      <h1>BentoBox</h1>
      <h2>Thousands of kids in American schools have unpaid school lunch balances.</h2>
      <h2>Help ease the burden for these students and their families.</h2>
    </section>
    <md-card>
      <md-card-media>
        <div id="map"></div>
      </md-card-media>

      <md-card-actions>
        <router-link tag="md-button" class="md-primary"
          to="/schools">
          List of schools
        </router-link>
      </md-card-actions>
    </md-card>
    <div class="flex row container">
      <md-card class="main">
        <md-card-header>
          <h2 class="md-title">Our Story?</h2>
        </md-card-header>

        <md-card-content>
          <p>It all started with a tweet -- one simple tweet asking for people across the country to contact their local schools and ask if there were students with school lunch balances and how they could help pay the balances off for those students.</p>
          <p>I answered the call and was surprised by just how many schools in my own community and beyond have students with balances. Thousands and thousands of dollars. As a concerned community member who is committed helping kids, I jumped at the opportunity to lessen the burden for some of these students and working families.</p>
        </md-card-content>
      </md-card>
      <md-card class="secondary">
        <md-card-header>
          <h2 class="md-title">Why?</h2>
        </md-card-header>

        <md-card-content>
					<p>Or maybe we should be asking how. How is it that the richest and most powerful nation in the world has thousands of kids in its schools unable to afford to pay for breakfast or lunch?</p>
          <p>When it comes to the biggest challenges our communities face, so few software developers and technologists are tackling the basic issues that matter most.</p>
        </md-card-content>
      </md-card>

    </div>
    <div class="flex column container">
      <md-card>
        <md-card-header>
          <h2 class="md-title">Where?</h2>
        </md-card-header>

        <md-card-content>
          <p>We currently allow schools all over the country to share their unpaid lunch balances with us, and we provide donors the ability to contribute directly to the schools.</p>
        </md-card-content>

        <md-card-actions>
          <router-link tag="md-button" class="md-primary"
            to="/create">
            Host your school
          </router-link>
          <router-link tag="md-button" class="md-primary"
            to="/schools">
            Contact a local school
          </router-link>
        </md-card-actions>
      </md-card>
    </div>
    <footer>
      <div class="container flex column">
        <div class="social-links">
          <a class="twitter" href="https://twitter.com/bentoboxschools">
            <md-icon class="md-size-2x" md-src="/static/twitter-box.svg"></md-icon>
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
  background-image: url('../assets/food.svg');
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

.md-card .md-card-header h2 {
  letter-spacing: 0.3em;
  border-bottom: 1px solid #e3e3e3;
}
.md-card {
  margin-bottom: 1em;
}
.flex.row .md-card:not(:last-of-type) {
  margin-right: 1em;
}
.flex.row .main {
  flex: 1.6;
}
.flex.row .secondary {
  flex: 1;
}

footer {
  background-color: #fff;
  padding: 0 2em;
}
.social-links {
  align-self: flex-end;
  margin-top: 3em;
  margin-bottom: 2em;
}
.social-links a.twitter {
  color: #1da1f2;
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

  .md-card {
    margin-left: 1em;
    margin-right: 1em;
  }
  .flex.row {
    flex-direction: column;
  }
}

</style>
