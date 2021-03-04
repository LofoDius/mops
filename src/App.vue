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

      <vl-layer-image id="xkcd">
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
    <div class="pagination">
      <button @click="paginationClick">Назад</button>
      <button @click="paginationClick">2</button>
      <button @click="paginationClick">3</button>
      <button @click="paginationClick">4</button>
    </div>
  </div>
</template>

<script>
import * as olExt from 'vuelayers/lib/ol-ext';

let size = {
  b2f3: [4000, 1720],

};

let extent = [0, 0, ...size.b2f3];

// let imgUrls = {
//   firstBuilding: [
//     'https://sun9-75.userapi.com/impg/sBibAjwIT4VjMFGlnnuAcLrYkMDbTi-85evMmg/CJH_XWLIOX0.jpg?size=630x839&quality=96&proxy=1&sign=f64ed832c88c068be814a5a2111b5920&type=album',
//     'https://sun9-70.userapi.com/impg/k9_qAEdd_6yAY8NQ8k0f4PSQ7Y0159KACoZnuA/IiYOnp2JIcg.jpg?size=784x852&quality=96&proxy=1&sign=61cf4209902bb85a00206bbec0f981ad&type=album',
//     'https://sun9-41.userapi.com/impg/rZgE0sHu-q7JlY1OG6zQfn3TQXEyR7TyP4vcOA/UQv4JmttsVI.jpg?size=612x858&quality=96&proxy=1&sign=43c877b6e384d92e9dbc26afe1851018&type=album'
//   ],
//   secondBuilding: [
//     'https://sun9-76.userapi.com/impg/w6f396O6CHb7N0b3F27e_rDcjM7CJYvhVJEBZQ/U9omaisVeQY.jpg?size=581x831&quality=96&proxy=1&sign=da7ff6a9f44daa5706dc71bc93277523&type=album',
//     'https://sun9-3.userapi.com/impg/2IyPpkPyGrosh8lTO0dsklHVTYZyE8PJcQfMTA/NIe5CjiAno8.jpg?size=713x840&quality=96&proxy=1&sign=7244fc8e4ee8a39306e02ce7014d2c5d&type=album',
//     'https://sun9-57.userapi.com/impg/fuYSiG_cic6O9XaCSfSSlGPKhN5p9aXBQ1OYzg/fkGr3bHJVpM.jpg?size=591x810&quality=96&proxy=1&sign=721fe22271d42ef9be8fb7bf2ec2ea2b&type=album'
//   ],
//   test: 'https://i.imgur.com/HTTIrye.jpg'
// };



let customProj = {
  b2f3: olExt.createProj({
    code: 'xkcd-image',
    units: 'pixels',
    extent,
  }),


};

olExt.addProj(customProj.b2f3);

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
      center: [size.b2f3[0] / 2, size.b2f3[1] / 2],
      rotation: 0,
      projection: customProj.b2f3.getCode(),
      imgSize: size.b2f3,
      imgExtent: extent,
      paginationCoord: [50, 50],
      overlayCoordinate: [2000, 1000]
    }
  },

  methods: {
    paginationClick(e) {
      if (e.target.innerText === 'Назад') {
        return false;
      }
      this.floor = e.target.innerText - 2;
    }
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

button {
  background: lightgray;
  border: none;
  margin: 2px;
}

.pagination {
  position: absolute;
  bottom: 1vh;
  right: 2vw;
}
</style>