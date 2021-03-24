<template>
  <div id="app">
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"  style="height: 100%" >
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

      <vl-feature id="firstBuilding">
        <vl-geom-polygon :coordinates="[polygons[0]]"></vl-geom-polygon>
      </vl-feature>


      <vl-feature id="secondBuilding">
        <vl-geom-polygon :coordinates="[polygons[1]]"></vl-geom-polygon>
      </vl-feature>


      <vl-feature id="ninthBuilding">
        <vl-geom-polygon :coordinates="[polygons[2]]"></vl-geom-polygon>
      </vl-feature>


      <vl-feature id="BBuilding" >
        <vl-geom-polygon :coordinates="[polygons[3]]"></vl-geom-polygon>
      </vl-feature>

      <vl-interaction-select
          :features.sync="selectedFeatures"
      >
        <vl-style-box>
          <vl-style-fill
              :color="[100, 145, 155, 0.3]"
          />
        </vl-style-box>
      </vl-interaction-select>

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

    data() {
      return {
        building: 'firstBuilding',
        floor: 1,
        selectedFeatures: [],
        highlightClasses: [],
        // VueLayers Settings
        zoom: 4,
        maxZoom: 5,
        center: [size[0] / 2, size[1] / 2],
        rotation: 0,
        projection: customProj.getCode(),
        imgSize: size,
        imgExtent: extent,
        overlayCoordinate: [2000, 1000],

        polygons: [
          [ // 1 корпус
            [1993, 1029], [2167, 1029], [2167, 1153], [2096, 1153], [2096, 1253], [2167, 1253], [2167, 1377],
            [1993, 1377], [1993, 1459], [2052, 1459], [2052, 1633], [2134, 1633], [2134, 1573], [2307, 1573],
            [2307, 1491], [2249, 1491], [2249, 1318], [2226, 1318], [2226, 1252], [2306, 1252], [2306, 1153],
            [2226, 1153], [2226, 1087], [2250, 1087], [2250, 914], [2308, 914], [2308, 832], [2135, 832],
            [2135, 773], [2052, 773], [2052, 947], [1993, 947], [1993, 1029]
          ],
          [ // 2 копрус
            [2767, 1254], [2846, 1254], [2846, 1319], [2822, 1319], [2822, 1492], [2765, 1492],
            [2765, 1575], [2938, 1575], [2938, 1634], [3020, 1634], [3020, 1461], [3079, 1461],
            [3079, 1378], [2905, 1378], [2905, 1254], [2977, 1254], [2977, 1155], [2905, 1155],
            [2905, 1030], [3078, 1030], [3078, 949], [3020, 949], [3020, 775], [2937, 775],
            [2937, 833], [2764, 833], [2764, 916], [2822, 916], [2822, 1090], [2846, 1090],
            [2846, 1155], [2767, 1155], [2767, 1254]
          ],
          [ // 9 корпус
            [3275, 1632], [3358, 1632], [3358, 1532], [3626, 1532], [3626, 1418], [3395, 1418],
            [3395, 1327], [3578, 1327], [3578, 1362], [3695, 1362], [3695, 1143], [3578, 1143],
            [3578, 1178], [3395, 1178], [3395, 989], [3626, 989], [3626, 873], [3358, 873],
            [3358, 773], [3276, 773], [3276, 947], [3163, 947], [3163, 980], [3079, 980],
            [3079, 1030], [3275, 1030], [3275, 1377], [3163, 1377], [3163, 1459], [3275, 1459], [3275, 1632]
          ],
          [ // Б корпус
            [3290, 314], [3932, 314], [3932, 45], [3290, 45], [3290, 314]
          ]
        ]
      }
    },

    computed: {
      imgUrl() {
        return 'https://i.imgur.com/sOs5eTN.jpeg'
      },
    },

    methods: {}
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