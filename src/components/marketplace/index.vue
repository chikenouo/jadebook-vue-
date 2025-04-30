<template>
  <div class="marketplace-container">
    <div class="marketplace-header">
      <h1>商品市集</h1>

      <!-- 精選商品輪播 -->
      <div class="featured-products" v-if="featuredProducts.length > 0">
        <h2 class="featured-title">精選商品</h2>
        <div class="featured-carousel">
          <div
            v-for="product in featuredProducts"
            :key="product.id"
            class="featured-product-card"
            @click="openProductDetails(product)"
          >
            <div class="featured-product-image">
              <img :src="product.image" :alt="product.title" />
            </div>
            <div class="featured-product-info">
              <div class="featured-product-price">
                ${{ product.price.toLocaleString() }}
              </div>
              <div class="featured-product-title">{{ product.title }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="marketplace-filters">
        <div class="filter-section">
          <el-input
            v-model="searchQuery"
            placeholder="在商品市集中搜尋..."
            prefix-icon="el-icon-search"
            class="search-input"
            clearable
          />
        </div>
        <div class="filter-section">
          <el-select
            v-model="selectedCategory"
            placeholder="所有分類"
            class="category-select"
          >
            <el-option label="所有分類" value="" />
            <el-option
              v-for="category in categories"
              :key="category"
              :label="category"
              :value="category"
            />
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Marketplace',
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      categories: [],
      featuredProducts: [],
    }
  },
  methods: {
    openProductDetails(product) {
      // 實現商品詳情頁面跳轉邏輯
    },
  },
}
</script>

<style scoped>
.marketplace-container {
  padding: 20px;
}

.marketplace-header {
  margin-bottom: 20px;
}

.marketplace-header h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.featured-products {
  margin-bottom: 30px;
}

.featured-title {
  font-size: 18px;
  margin-bottom: 15px;
}

.featured-carousel {
  display: flex;
  overflow-x: auto;
  gap: 15px;
  padding: 10px 0;
}

.featured-product-card {
  flex: 0 0 200px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.featured-product-card:hover {
  transform: translateY(-2px);
}

.featured-product-image {
  height: 150px;
  overflow: hidden;
}

.featured-product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-product-info {
  padding: 10px;
}

.featured-product-price {
  font-size: 16px;
  font-weight: bold;
  color: #1877f2;
}

.featured-product-title {
  margin-top: 5px;
  font-size: 14px;
  color: #1c1e21;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.marketplace-filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.filter-section {
  flex: 1;
}

.search-input {
  width: 100%;
}

.category-select {
  width: 100%;
}
</style>
