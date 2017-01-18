<template>
  <div class="landing-page">
    <section class="hero-background">
      <h1>BentoBox</h1>
      <h2>Pledge to pay off the lunch debts of students.</h2>
    </section>
    <md-card>
      <md-card-media>
        <div id="map"></div>
      </md-card-media>

      <md-card-header>
        <div class="md-title">Schools around you</div>
      </md-card-header>

      <md-card-actions>
        <router-link tag="md-button" class="md-raised"
          to="/schools">
        List of schools
        </router-link>
      </md-card-actions>

      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
      </md-card-content>
    </md-card>
    <div class="flex row container">
      <md-card>
        <md-card-header>
          <div class="md-title">Why?</div>
        </md-card-header>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-header>
          <div class="md-title">What?</div>
        </md-card-header>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </md-card-content>
      </md-card>
      <md-card>
        <md-card-header>
          <div class="md-title">How?</div>
        </md-card-header>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </md-card-content>
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
@media (max-width: 600px) {
  .hero-background {
    height: 42em;
  }

  .md-card {
    margin-left: 1em;
    margin-right: 1em;
  }
}
.hero-background h1 {
  font-size: 64px;
  font-weight: 900;
}

.md-card {
  margin-bottom: 1em;
}
.flex.row .md-card:not(:last-of-type) {
  margin-right: 1em;
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
</style>
