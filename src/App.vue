<template>
  <div id="app">
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" class="map">
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


      <vl-feature id="secondBuilding">
        <vl-geom-polygon :coordinates="[polygons[1]]"></vl-geom-polygon>
      </vl-feature>

      <vl-feature id="firstBuilding">
        <vl-geom-polygon :coordinates="[polygons[0]]"></vl-geom-polygon>
      </vl-feature>

      <vl-feature id="ninthBuilding">
        <vl-geom-polygon :coordinates="[polygons[2]]"></vl-geom-polygon>
      </vl-feature>

      <vl-feature id="BBuilding">
        <vl-geom-polygon :coordinates="[polygons[3]]"></vl-geom-polygon>
      </vl-feature>

      <vl-interaction-select
          :features.sync="selectedFeatures"
      >
        <vl-style-box>
          <vl-style-fill
              :color="[170, 250, 250, 0.3]"
          />
        </vl-style-box>
      </vl-interaction-select>

      <vl-overlay v-for="classroom in classroomsToShow" :position="classroom.coords" :key="classroom.name">
        <template>
          <div v-show="zoom >= 3.25" :key="'class' + classroom.name"
               :class="{'highlight-classroom': highlightClasses.includes(classroom.name),
               'classroom-number': true}">
            {{ classroom.name }}
          </div>
        </template>
      </vl-overlay>

      <vl-overlay
          v-for="feature in selectedFeatures"
          :key="feature.id"
          :id="feature.id"
          class="pagination"
          :auto-pan="true"
          :auto-pan-animation="{duration: 300}"
          :position="popupPosition"
      >
        <div class="popup-container">
          <p>Выберите этаж</p>
          <div class="popup-buttons__container">
            <button
                class="popup-button"
                :class="{'popup-button__selected': selectedFloor === 2,
                  'popup-button_highlighted': highlightButton(feature.id, 2)}"
                @click="selectFloor(2)"
            >
              2
            </button>
            <button
                class="popup-button"
                :class="{'popup-button__selected': selectedFloor === 3,
                'popup-button_highlighted': highlightButton(feature.id, 3)}"
                @click="selectFloor(3)"
            >
              3
            </button>
            <button
                class="popup-button"
                :class="{'popup-button__selected': selectedFloor === 4,
                'popup-button_highlighted': highlightButton(feature.id, 4)}"
                @click="selectedFloor = 4"
            >
              4
            </button>
          </div>
        </div>
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
      selectedFeatures: [],
      highlightClasses: [],
      selectedFloor: 2,
      classroomsToShow: [],
      // VueLayers Settings
      zoom: 3,
      maxZoom: 5,
      center: [2500, 1200],
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
      ],

      firstBuildingClassrooms: [
        {"name": "Туалет Ж", "floor": 2, "coords": [2100, 1273]},
        {"name": "Туалет М", "floor": 2, "coords": [2100, 1150]},
        {"name": "205", "floor": 2, "coords": [2000, 1050]},
        {"name": "204", "floor": 2, "coords": [2040, 1050]},
        {"name": "209", "floor": 2, "coords": [2140, 830]},
        {"name": "210", "floor": 2, "coords": [2170, 830]},
        {"name": "211", "floor": 2, "coords": [2210, 830]},
        {"name": "212", "floor": 2, "coords": [2250, 830]},
        {"name": "213", "floor": 2, "coords": [2290, 830]},
        {"name": "215", "floor": 2, "coords": [2255, 960]},
        {"name": "216", "floor": 2, "coords": [2255, 1070]},
        {"name": "217", "floor": 2, "coords": [2230, 1110]},
        {"name": "218", "floor": 2, "coords": [2230, 1150]},
        {"name": "219", "floor": 2, "coords": [2230, 1300]},
        {"name": "221", "floor": 2, "coords": [2255, 1380]},
        {"name": "221а", "floor": 2, "coords": [2255, 1350]}, // тут буква а из кирилицы
        {"name": "222", "floor": 2, "coords": [2255, 1410]},
        {"name": "223", "floor": 2, "coords": [2255, 1450]},
        {"name": "224", "floor": 2, "coords": [2255, 1485]},
        {"name": "226", "floor": 2, "coords": [2280, 1595]},
        {"name": "227", "floor": 2, "coords": [2240, 1595]},
        {"name": "229", "floor": 2, "coords": [2023, 1570]},
        {"name": "230", "floor": 2, "coords": [2023, 1530]},
        {"name": "231", "floor": 2, "coords": [2023, 1490]},
        {"name": "232", "floor": 2, "coords": [1995, 1370]},
        {"name": "233", "floor": 2, "coords": [2030, 1370]},
        {"name": "234", "floor": 2, "coords": [2095, 1370]},
        {"name": "235", "floor": 2, "coords": [2135, 1370]},
        // 3 этаж
        {"name": "Туалет Ж", "floor": 3, "coords": [2100, 1273]},
        {"name": "Туалет М", "floor": 3, "coords": [2100, 1150]},
        {"name": "308", "floor": 3, "coords": [2290, 830]},
        {"name": "309", "floor": 3, "coords": [2260, 830]},
        {"name": "310", "floor": 3, "coords": [2230, 830]},
        {"name": "311", "floor": 3, "coords": [2200, 830]},
        {"name": "312", "floor": 3, "coords": [2170, 830]},
        {"name": "313", "floor": 3, "coords": [2140, 830]},
        {"name": "316", "floor": 3, "coords": [2025, 790]},
        {"name": "317", "floor": 3, "coords": [2025, 830]},
        {"name": "318", "floor": 3, "coords": [2025, 900]},
        {"name": "320", "floor": 3, "coords": [1995, 1050]},
        {"name": "321", "floor": 3, "coords": [2030, 1050]},
        {"name": "322", "floor": 3, "coords": [2080, 1050]},
        {"name": "323", "floor": 3, "coords": [2130, 1050]},
        {"name": "325", "floor": 3, "coords": [2255, 950]},
        {"name": "326", "floor": 3, "coords": [2255, 1010]},
        {"name": "328", "floor": 3, "coords": [2255, 1080]},
        {"name": "329", "floor": 3, "coords": [2230, 1150]},
        {"name": "330", "floor": 3, "coords": [2230, 1110]},
        {"name": "Касса", "floor": 3, "coords": [2125, 1110]},
        {"name": "Бухгалтерия", "floor": 3, "coords": [2229, 1312]},
        {"name": "331", "floor": 3, "coords": [2253, 1340]},
        {"name": "332", "floor": 3, "coords": [2253, 1427]},
        {"name": "333", "floor": 3, "coords": [2253, 1477]},
        {"name": "334", "floor": 3, "coords": [2140, 1375]},
        {"name": "335", "floor": 3, "coords": [2040, 1375]},
        {"name": "336", "floor": 3, "coords": [2000, 1375]},
        {"name": "337", "floor": 3, "coords": [2023, 1480]},
        {"name": "338", "floor": 3, "coords": [2023, 1515]},
        {"name": "339", "floor": 3, "coords": [2023, 1550]},
        {"name": "340", "floor": 3, "coords": [2023, 1585]},
        {"name": "341", "floor": 3, "coords": [2023, 1620]},
        {"name": "342", "floor": 3, "coords": [2140, 1590]},
        {"name": "343", "floor": 3, "coords": [2175, 1590]},
        {"name": "344", "floor": 3, "coords": [2210, 1590]},
        {"name": "345", "floor": 3, "coords": [2245, 1590]},
        {"name": "346", "floor": 3, "coords": [2280, 1590]},
        // 4 этаж
        {"name": "Туалет Ж", "floor": 4, "coords": [2100, 1273]},
        {"name": "Туалет М", "floor": 4, "coords": [2100, 1150]},
        {"name": "411", "floor": 4, "coords": [2025, 940]},
        {"name": "409", "floor": 4, "coords": [2110, 1045]},
        {"name": "410", "floor": 4, "coords": [2000, 1045]},
        {"name": "412", "floor": 4, "coords": [2025, 830]},
        {"name": "413", "floor": 4, "coords": [2025, 790]},
        {"name": "414", "floor": 4, "coords": [2140, 830]},
        {"name": "415", "floor": 4, "coords": [2220, 830]},
        {"name": "416", "floor": 4, "coords": [2250, 830]},
        {"name": "417", "floor": 4, "coords": [2280, 830]},
        {"name": "418", "floor": 4, "coords": [2255, 950]},
        {"name": "419", "floor": 4, "coords": [2255, 1030]},
        {"name": "421", "floor": 4, "coords": [2230, 1105]},
        {"name": "422", "floor": 4, "coords": [2230, 1150]},
        {"name": "424", "floor": 4, "coords": [2310, 1210]},
        {"name": "426", "floor": 4, "coords": [2230, 1270]},
        {"name": "427", "floor": 4, "coords": [2230, 1310]},
        {"name": "428", "floor": 4, "coords": [2255, 1350]},
        {"name": "429", "floor": 4, "coords": [2255, 1390]},
        {"name": "430", "floor": 4, "coords": [2290, 1590]},
        {"name": "431", "floor": 4, "coords": [2260, 1590]},
        {"name": "432", "floor": 4, "coords": [2230, 1590]},
        {"name": "433", "floor": 4, "coords": [2200, 1590]},
        {"name": "434", "floor": 4, "coords": [2025, 1630]},
        {"name": "435", "floor": 4, "coords": [2025, 1580]},
        {"name": "436", "floor": 4, "coords": [2025, 1530]},
        {"name": "437", "floor": 4, "coords": [2000, 1370]},
        {"name": "438", "floor": 4, "coords": [2035, 1370]},
        {"name": "439", "floor": 4, "coords": [2075, 1370]},
        {"name": "440", "floor": 4, "coords": [2125, 1370]}
      ],

      secondBuildingClassrooms: [
        {"name": "Туалет Ж", "floor": 2, "coords": [2910, 1275]},
        {"name": "Туалет М", "floor": 2, "coords": [2910, 1150]},
        {"name": "240", "floor": 2, "coords": [2770, 1590]},
        {"name": "241", "floor": 2, "coords": [2800, 1590]},
        {"name": "242", "floor": 2, "coords": [2830, 1590]},
        {"name": "243", "floor": 2, "coords": [2860, 1590]},
        {"name": "246", "floor": 2, "coords": [3025, 1610]},
        {"name": "247", "floor": 2, "coords": [3025, 1540]},
        {"name": "251", "floor": 2, "coords": [2795, 1480]},
        {"name": "252", "floor": 2, "coords": [2795, 1380]},
        {"name": "253", "floor": 2, "coords": [2795, 1340]},
        {"name": "254", "floor": 2, "coords": [2820, 1300]},
        {"name": "255", "floor": 2, "coords": [2740, 1210]},
        {"name": "Библиотека", "floor": 2, "coords": [2765, 1130]},
        {"name": "259", "floor": 2, "coords": [2985, 1050]},
        {"name": "262", "floor": 2, "coords": [3025, 890]},
        {"name": "263", "floor": 2, "coords": [3025, 850]},
        {"name": "264", "floor": 2, "coords": [2840, 830]},
        // 3 этаж
        {"name": "Туалет Ж", "floor": 3, "coords": [2910, 1275]},
        {"name": "Туалет М", "floor": 3, "coords": [2910, 1150]},
        {"name": "349", "floor": 3, "coords": [2780, 1590]},
        {"name": "350", "floor": 3, "coords": [2820, 1590]},
        {"name": "351", "floor": 3, "coords": [2860, 1590]},
        {"name": "353", "floor": 3, "coords": [2900, 1590]},
        {"name": "354", "floor": 3, "coords": [3025, 1630]},
        {"name": "355", "floor": 3, "coords": [3025, 1610]},
        {"name": "356", "floor": 3, "coords": [3025, 1590]},
        {"name": "360", "floor": 3, "coords": [2795, 1485]},
        {"name": "361", "floor": 3, "coords": [2795, 1445]},
        {"name": "362", "floor": 3, "coords": [2795, 1405]},
        {"name": "363", "floor": 3, "coords": [2795, 1365]},
        {"name": "366", "floor": 3, "coords": [2795, 1080]},
        {"name": "367", "floor": 3, "coords": [2795, 1050]},
        {"name": "368", "floor": 3, "coords": [2795, 1020]},
        {"name": "369", "floor": 3, "coords": [2795, 990]},
        {"name": "370", "floor": 3, "coords": [2795, 960]},
        {"name": "371", "floor": 3, "coords": [2915, 1050]},
        {"name": "374", "floor": 3, "coords": [3015, 1050]},
        {"name": "375", "floor": 3, "coords": [3045, 1050]},
        {"name": "376", "floor": 3, "coords": [3025, 920]},
        {"name": "377", "floor": 3, "coords": [3025, 880]},
        {"name": "378", "floor": 3, "coords": [3025, 830]},
        {"name": "379", "floor": 3, "coords": [3025, 790]},
        {"name": "380", "floor": 3, "coords": [2905, 830]},
        {"name": "382", "floor": 3, "coords": [2850, 830]},
        // 4 этаж
        {"name": "Туалет Ж", "floor": 4, "coords": [2910, 1275]},
        {"name": "Туалет М", "floor": 4, "coords": [2910, 1150]},
        {"name": "441", "floor": 4, "coords": [2770, 1590]},
        {"name": "442", "floor": 4, "coords": [2810, 1590]},
        {"name": "443", "floor": 4, "coords": [2890, 1590]},
        {"name": "444", "floor": 4, "coords": [3025, 1600]},
        {"name": "445", "floor": 4, "coords": [3025, 1630]},
        {"name": "446", "floor": 4, "coords": [3025, 1520]},
        {"name": "447", "floor": 4, "coords": [3025, 1480]},
        {"name": "448", "floor": 4, "coords": [3060, 1375]},
        {"name": "449", "floor": 4, "coords": [3030, 1375]},
        {"name": "450", "floor": 4, "coords": [3000, 1375]},
        {"name": "451", "floor": 4, "coords": [2940, 1375]},
        {"name": "452", "floor": 4, "coords": [2910, 1375]},
        {"name": "453", "floor": 4, "coords": [2795, 1490]},
        {"name": "454", "floor": 4, "coords": [2795, 1450]},
        {"name": "455", "floor": 4, "coords": [2795, 1390]},
        {"name": "456", "floor": 4, "coords": [2795, 1350]},
        {"name": "458", "floor": 4, "coords": [2740, 1210]},
        {"name": "460", "floor": 4, "coords": [2795, 1080]},
        {"name": "461", "floor": 4, "coords": [2795, 1040]},
        {"name": "462", "floor": 4, "coords": [2795, 1000]},
        {"name": "463", "floor": 4, "coords": [2795, 960]},
        {"name": "464", "floor": 4, "coords": [2910, 1050]},
        {"name": "465", "floor": 4, "coords": [2950, 1050]},
        {"name": "466", "floor": 4, "coords": [2990, 1050]},
        {"name": "468", "floor": 4, "coords": [3030, 1050]},
        {"name": "469", "floor": 4, "coords": [3025, 945]},
        {"name": "470", "floor": 4, "coords": [3025, 880]},
        {"name": "471", "floor": 4, "coords": [3025, 830]},
        {"name": "472", "floor": 4, "coords": [3025, 790]},
        {"name": "473", "floor": 4, "coords": [2915, 830]},
        {"name": "474", "floor": 4, "coords": [2888, 830]},
        {"name": "475", "floor": 4, "coords": [2862, 830]},
        {"name": "476", "floor": 4, "coords": [2835, 830]},
        {"name": "477", "floor": 4, "coords": [2810, 830]},
        {"name": "478", "floor": 4, "coords": [2785, 830]},
        {"name": "479", "floor": 4, "coords": [2760, 830]},
        {"name": "480", "floor": 4, "coords": [2740, 850]}
      ]
    }
  },

  computed: {
    imgUrl() {
      return 'https://i.imgur.com/sOs5eTN.jpeg'
    },
    popupPosition() {
      switch (this.selectedFeatures[0].id) {
        case 'firstBuilding': {
          return [2070, 1550];
        }
        case 'secondBuilding': {
          return [2840, 1550];
        }
        case 'ninthBuilding': {
          return [3420, 1320];
        }
        case 'BBuilding': {
          return [3520, 240];
        }
        default: {
          return [-1, -1];
        }
      }
    },
  },

  created() {
    window.setHighlightedClasses = this.setHighlightedClasses;
  },

  methods: {
    setHighlightedClasses(classes) {
      this.highlightClasses = classes;
    },

    selectFloor(targetFloor) {
      this.selectedFloor = targetFloor;
    },

    updateClassroomsToShow() {
      switch (this.selectedFeatures[0].id) {
        case 'firstBuilding': {
          this.classroomsToShow = this.firstBuildingClassrooms.filter(c => c.floor === this.selectedFloor);
          break;
        }
        case 'secondBuilding': {
          this.classroomsToShow = this.secondBuildingClassrooms.filter(c => c.floor === this.selectedFloor);
          break;
        }
        case 'ninthBuilding': {
          this.classroomsToShow = [];
          break;
        }
        case 'BBuilding': {
          this.classroomsToShow = [];
          break;
        }
      }
    },

    highlightButton(building, floor) {
      switch (building) {
        case 'firstBuilding': {
          return this.firstBuildingClassrooms.filter(classroom =>
              this.highlightClasses.includes(classroom.name) && classroom.floor === floor)
              .length !== 0;

        }
        case 'secondBuilding': {
          return this.secondBuildingClassrooms.filter(classroom => this.highlightClasses.includes(classroom.name))
              .length !== 0;

        }
        default:
          return false;
      }
    },
  },

  watch: {
    selectedFeatures() {
      this.selectedFloor = 2;
      if (this.selectedFeatures.length === 0) {
        this.classroomsToShow = [];
        return;
      }
      this.updateClassroomsToShow();
    },

    selectedFloor() {
      this.updateClassroomsToShow();
    }
  },

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
  font-family: sans-serif;
  height: 100%;
}

.map {
  height: 100%;
  margin: 0;
  padding: 0;
}

.classroom-number {
  margin: -2px -1px;
}

.popup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 5px 10px;

  color: white;

  background: #7AB5B6;
  border: 2px #324B4B solid;
  border-radius: 10px;
}

.popup-buttons__container {
  display: flex;
  justify-content: space-around;
}

.popup-button {
  border: none;
  font-size: 14px;
  padding: 5px;
  margin: 0 10px;
  border-radius: 5pt;
}

.popup-button:focus {
  outline: none;
  border: 1px solid #324B4B;
}

.popup-button__selected {
  background: #86BBD8;
  border: 1px solid #324B4B;
  border-radius: 5pt;
}

.popup-button_highlighted {
  box-shadow: 0 0 2pt 2pt #F69865;
}

.highlight-classroom {
  box-shadow: 1px 1px 2pt 2pt #F69865;
  border-radius: 5px;
}

</style>