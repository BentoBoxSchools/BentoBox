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

<style>
#map {
  height: 20em;
  width: 100%;
  background-color: #ccc;
}
.landing-page {
  margin-bottom: 2em;
}
.hero-background {
  height: 40em;
  width: 100%;
  background-color: #009688;
  background-image: url('../assets/food.svg');
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
}
.hero-background h1 {
  font-size: 64px;
  font-weight: 900;
}
</style>
