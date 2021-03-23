<template>
  <div id="app">
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" style="height: 100%">
      <vl-view
          :projection="projection"
          :zoom.sync="zoom"
          :center.sync="center"
          :rotation.sync="rotation"
          :max-zoom="maxZoom"
          :min-zoom="2"
          :extent="imgExtent"
      />

      <vl-layer-image id="map">
        <vl-source-image-static :url="imgUrl" :size="imgSize" :extent="imgExtent" :projection="projection"/>
      </vl-layer-image>

      <vl-feature id="point">
        <vl-geom-point :coordinates="[4992, 992]"/>
      </vl-feature>

      <vl-overlay id="overlay" :position="overlayCoordinate">
        <template>
          <div class="overlay-content">
            313
          </div>
        </template>
      </vl-overlay>

    </vl-map>
  </div>
</template>

<script>
import * as olExt from 'vuelayers/lib/ol-ext';

let size = [4000, 1720]

let extent = [0, 0, ...size];

let customProj = olExt.createProj({
    code: 'map-image',
    units: 'pixels',
    extent,
  })

olExt.addProj(customProj);

export default {
  name: "App",

  computed: {
    imgUrl() {
      return 'https://i.imgur.com/sOs5eTN.jpeg'
    }
  },

  data() {
    return {
      building: 'firstBuilding',
      floor: 1,

      highlightClasses: [],
      // VueLayers Settings
      zoom: 4,
      maxZoom: 5,
      center: [size[0] / 2, size[1] / 2],
      rotation: 0,
      projection: customProj.getCode(),
      imgSize: size,
      imgExtent: extent,
      paginationCoord: [50, 50],
      overlayCoordinate: [2000, 1000]
    }
  },

  methods: {

  }
}
</script>

<style>
@import "~vuelayers/lib/style.css";

#app {
  margin: auto;
  height: 100%;
}

html,
body {
  height: 100%;
}
</style>