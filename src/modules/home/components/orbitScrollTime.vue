<template>
  <div v-if="isLoading">
    <SpinnerPlugin :isLoading="isLoading" />
  </div>
  <div v-else class="my-orbit" @wheel="handleZoom">
    <div class="centre"></div>
    <div v-for="(orbit, orbitIndex) in displayedOrbits" :key="orbitIndex" :class="['orbit', `orbit${orbitIndex + 1}`]" :style="orbitStyle(orbitIndex)">
      <div v-for="(item, itemIndex) in orbit.array" :key="item.id" class="item" :style="itemStyle(orbitIndex, itemIndex)">
        <img :src="item.img" alt="Avatar" class="avatar">
            <div class="details" v-on="on">
              <p>{{ item.name }}</p>
              <p>{{ item.position }}</p>
              <p>{{ item.city }}</p>
              <p>{{ item._orbits_last_message.message_head }}</p>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SpinnerPlugin from '../../../plugins/loader/views/Spinner.vue';

export default {
  name: "OrbitScrollTime",
  components: { SpinnerPlugin },
  data() {
    return {
      currentStartIndex: 0,
      orbitsToShow: 7,
      zoomLevel: 1,
      minZoom: 1.0,
      maxZoom: 2,
      zoomStep: 0.1,
      orbitData: null,
      isLoading: true,
    };
  },

  beforeRouteEnter(to, from, next) {
    const currentDate = new Date().toISOString().split('T')[0];
    const apiUrl = `https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week?start_date=${currentDate}`;

    axios.get(apiUrl)
      .then((res) => {
        next(vm => {
          vm.orbitData = res.data;
          vm.isLoading = false;
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        next(vm => {
          vm.isLoading = false;
        });
      });
  },

  computed: {
    displayedOrbits() {
      if (!this.orbitData) {
        return [];
      }

      const totalOrbits = this.orbitData.length;
      const startIndex = this.currentStartIndex % totalOrbits;
      const endIndex = (startIndex + this.orbitsToShow) % totalOrbits;

      if (startIndex <= endIndex) {
        return this.orbitData?.slice(startIndex, endIndex + 1);
      } else {
        return this.orbitData?.slice(startIndex, totalOrbits).concat(this.orbitData?.slice(0, endIndex + 1));
      }
    }
  },

  methods: {
    handleZoom(event) {
      event.preventDefault(); // Prevent default scroll behavior
      const delta = Math.sign(event.deltaY); // Get scroll direction

      if (delta > 0 && this.zoomLevel > this.minZoom) {
        this.zoomLevel -= this.zoomStep; // Decrease zoom level
      } else if (delta < 0 && this.zoomLevel < this.maxZoom) {
        this.zoomLevel += this.zoomStep; // Increase zoom level
      }
    },
    orbitStyle(orbitIndex) {
      const size = (orbitIndex + 1) * 100 * this.zoomLevel;
      return {
        width: `${size}px`,
        height: `${size}px`,
      };
    },
    itemStyle(orbitIndex, itemIndex) {
      const orbit = this.displayedOrbits[orbitIndex];
      if (!orbit) return {};
      const angle = (360 / orbit.array.length) * itemIndex;
      const baseRadius = (orbitIndex + 1) * 100;
      const maxAllowedRadius = baseRadius * this.maxZoom; // Maximum allowed radius based on maxZoom

      const radius = Math.min(baseRadius * this.zoomLevel, maxAllowedRadius);

      const posX = Math.cos((angle * Math.PI) / 180) * radius;
      const posY = Math.sin((angle * Math.PI) / 180) * radius;

      return {
        transform: `translate(${posX}px, ${posY}px)`,
        zIndex: itemIndex + 1
      };
    }
  }
};
</script>

<style scoped>
.centre {
  position: absolute;
  width: 100px;
  height: 100px;
  background: rgb(211, 211, 178);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #0c0c0c;
}

.item {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.details {
  display: none;
  position: absolute;
  width: 150px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  top: 60px; 
  left: 50%;
  z-index: 10;
}

.item:hover .details {
  display: block;
}

.details p {
  margin: 5px 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg) translate(-50%, -50%);
  }
  to {
    transform: rotate(360deg) translate(-50%, -50%);
  }
}
</style>
