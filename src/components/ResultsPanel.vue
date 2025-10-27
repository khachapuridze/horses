<template>
  <div class="results-panel">
    <div class="panel-header">
      <div class="tab active">Program</div>
      <div class="tab">Results</div>
    </div>
    
    <div class="results-content">
      <div v-if="!results.length" class="no-results">No results yet</div>
      <div v-for="(r, idx) in results" :key="idx" class="result-block">
        <div class="result-header">
          <span class="lap-badge">{{ idx + 1 }}ST Lap - {{ schedule[idx]?.length }}m</span>
        </div>
        <table class="res-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in r" :key="row.id" :class="{ 'winner': row.position === 1 }">
              <td class="position">{{ row.position }}</td>
              <td class="name">{{ row.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default { computed: { ...mapState(['results', 'schedule']) } };
</script>

<style scoped>
.results-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.panel-header {
  display: flex;
  margin-bottom: 16px;
}

.tab {
  flex: 1;
  padding: 10px;
  text-align: center;
  background: #e0e0e0;
  border: 1px solid #ccc;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
}

.tab:first-child {
  border-radius: 6px 0 0 6px;
}

.tab:last-child {
  border-radius: 0 6px 6px 0;
  border-left: none;
}

.tab.active {
  background: #4caf50;
  color: white;
}

.results-content {
  flex: 1;
  overflow-y: auto;
}

.no-results {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
}

.result-block { 
  margin-bottom: 16px; 
  border: 1px solid #ddd; 
  border-radius: 8px; 
  background: #fafafa;
  overflow: hidden;
}

.result-header { 
  background: #f0f0f0;
  padding: 8px 12px;
  border-bottom: 1px solid #ddd;
}

.lap-badge {
  background: #ff9800;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.res-table { 
  width: 100%; 
  border-collapse: collapse; 
  font-size: 13px;
}

.res-table th {
  background: #f5f5f5;
  padding: 8px 12px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

.res-table td { 
  padding: 6px 12px; 
  border-bottom: 1px solid #eee;
}

.res-table tr:hover {
  background: #f9f9f9;
}

.res-table tr.winner {
  background: #e8f5e8;
  font-weight: bold;
}

.position {
  width: 60px;
  text-align: center;
  font-weight: bold;
}

.name {
  font-weight: 500;
}
</style>