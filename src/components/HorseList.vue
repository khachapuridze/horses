<template>
  <div class="horse-list">
    <h3 class="list-title">Horse List (1- 20)</h3>
    <table class="horse-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Condition</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="h in horses" :key="h.id">
          <td class="name">{{ h.name }}</td>
          <td class="condition">{{ h.condition }}</td>
          <td class="color">
            <span class="color-swatch" :style="{background: h.color}"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['horsesPool']),
    horses() { return this.horsesPool || []; }
  }
};
</script>

<style scoped>
.horse-list {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.list-title {
  margin: 0 0 16px 0;
  padding: 8px 12px;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.horse-table { 
  width: 100%; 
  border-collapse: collapse; 
  font-size: 13px;
  flex: 1;
}

.horse-table th {
  background: #f5f5f5;
  padding: 10px 8px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  position: sticky;
  top: 0;
}

.horse-table td { 
  padding: 8px; 
  border-bottom: 1px solid #eee;
}

.horse-table tr:hover {
  background: #f9f9f9;
}

.name {
  font-weight: 500;
  color: #333;
}

.condition {
  text-align: center;
  font-weight: bold;
  color: #666;
}

.color {
  text-align: center;
}

.color-swatch { 
  width: 28px; 
  height: 16px; 
  display: inline-block; 
  border-radius: 4px; 
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px #ccc;
}
</style>