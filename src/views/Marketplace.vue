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
              <img :src="product.image" :alt="product.title">
            </div>
            <div class="featured-product-info">
              <div class="featured-product-price">${{ product.price.toLocaleString() }}</div>
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
          <el-select v-model="selectedCategory" placeholder="所有分類" class="category-select">
            <el-option label="所有分類" value="" />
            <el-option v-for="category in categories" :key="category" :label="category" :value="category" />
          </el-select>
        </div>
        <div class="filter-section">
          <el-select v-model="selectedPrice" placeholder="價格範圍" class="price-select">
            <el-option label="所有價格" value="" />
            <el-option label="$0 - $500" value="0-500" />
            <el-option label="$500 - $1,000" value="500-1000" />
            <el-option label="$1,000 - $5,000" value="1000-5000" />
            <el-option label="$5,000 以上" value="5000+" />
          </el-select>
        </div>
        <div class="filter-section">
          <el-select v-model="selectedLocation" placeholder="位置" class="location-select">
            <el-option label="所有地區" value="" />
            <el-option v-for="location in locations" :key="location" :label="location" :value="location" />
          </el-select>
        </div>
      </div>
    </div>
    
    <div class="marketplace-content">
      <!-- Sidebar Categories -->
      <div class="marketplace-sidebar desktop-only">
        <h3>分類</h3>
        <ul class="category-list">
          <li 
            v-for="category in categories" 
            :key="category"
            :class="{ active: selectedCategory === category }"
            @click="selectedCategory = category"
          >
            {{ category }}
          </li>
        </ul>
      </div>
      
      <!-- Products Grid -->
      <div class="products-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-card"
          @click="openProductDetails(product)"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.title">
          </div>
          <div class="product-info">
            <div class="product-price">${{ product.price.toLocaleString() }}</div>
            <div class="product-title">{{ product.title }}</div>
            <div class="product-location">
              <i class="fas fa-map-marker-alt"></i> {{ product.location }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Product Details Dialog -->
    <el-dialog
      v-model="productDetailsVisible"
      :title="null"
      width="800px"
      destroy-on-close
      custom-class="product-detail-dialog"
      :show-close="true"
      fullscreen-on-mobile
    >
      <template #header>
        <div class="dialog-empty-header"></div>
      </template>
      
      <div v-if="selectedProduct" class="product-details">
        <div class="product-detail-left">
          <div class="product-detail-gallery">
            <img :src="selectedProduct.image" :alt="selectedProduct.title" class="main-product-image">
          </div>
          
          <div class="product-detail-similar mobile-hidden">
            <h4 class="similar-title">類似商品</h4>
            <div class="similar-products">
              <div 
                v-for="product in filteredProducts.slice(0,4)" 
                :key="product.id" 
                class="similar-product-card"
                v-if="product.id !== selectedProduct.id"
                @click="openProductDetails(product)"
              >
                <div class="similar-product-image">
                  <img :src="product.image" :alt="product.title">
                </div>
                <div class="similar-product-price">${{ product.price.toLocaleString() }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="product-detail-right">
          <div class="product-detail-info">
            <h2 class="product-detail-price">${{ selectedProduct.price.toLocaleString() }}</h2>
            <h3 class="product-detail-title">{{ selectedProduct.title }}</h3>
            
            <div class="product-detail-meta">
              <div class="meta-item">
                <i class="fas fa-map-marker-alt"></i> {{ selectedProduct.location }}
              </div>
              <div class="meta-item">
                <i class="fas fa-tag"></i> {{ selectedProduct.category }}
              </div>
              <div class="meta-item">
                <i class="fas fa-clock"></i> {{ formatDate(selectedProduct.listed_date) }}
              </div>
            </div>
            
            <div class="product-detail-actions">
              <el-button type="primary" class="action-button">
                <i class="fas fa-comment"></i> 聯絡賣家
              </el-button>
              <el-button class="action-button">
                <i class="fas fa-bookmark"></i> 收藏商品
              </el-button>
            </div>
            
            <el-divider />
            
            <div class="product-detail-seller">
              <div class="seller-info">
                <img :src="selectedProduct.seller.avatar" alt="Seller" class="seller-avatar">
                <div>
                  <div class="seller-name">{{ selectedProduct.seller.name }}</div>
                  <div class="seller-rating">
                    <i class="fas fa-star"></i>
                    {{ selectedProduct.seller.rating }} · {{ selectedProduct.seller.reviews }} 個評價
                  </div>
                </div>
              </div>
              <el-button type="text" class="view-profile-button">查看賣家檔案 <i class="fas fa-angle-right"></i></el-button>
            </div>
            
            <el-divider />
            
            <div class="product-detail-description">
              <h4>商品詳情</h4>
              <p>{{ selectedProduct.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MarketplaceView',
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      selectedPrice: '',
      selectedLocation: '',
      productDetailsVisible: false,
      selectedProduct: null,
      
      // 商品分類列表
      categories: [
        '電子產品',
        '家具家飾',
        '汽車與零件',
        '服裝與配件',
        '收藏品',
        '運動器材',
        '玩具與遊戲',
        '樂器',
        '圖書與雜誌'
      ],
      
      // 地區列表
      locations: [
        '台北市',
        '新北市',
        '桃園市',
        '台中市',
        '台南市',
        '高雄市',
        '基隆市',
        '新竹市',
        '嘉義市'
      ],
      
      // 商品列表
      products: [
        {
          id: '1',
          title: 'Apple iPhone 13 128GB 午夜藍 (九成新)',
          price: 19000,
          description: '購買於2021年9月，外觀幾乎全新，附原廠配件及保護殼。電池健康度92%，無維修紀錄。因換新機故出售。',
          category: '電子產品',
          location: '台北市',
          image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-blue-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572386470',
          listed_date: new Date('2023-04-01').toISOString(),
          seller: {
            name: '陳小明',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            rating: 4.9,
            reviews: 18
          }
        },
        {
          id: '2',
          title: 'IKEA MALM 雙人床架含床墊 (白色)',
          price: 5500,
          description: '使用不到一年的IKEA MALM雙人床架(140x200cm)，附贈床墊。因搬家需要出售，整體狀況良好，有輕微使用痕跡。',
          category: '家具家飾',
          location: '新北市',
          image: 'https://www.ikea.com/tw/zh/images/products/malm-bed-frame-high-white-luroey__0638608_pe699032_s5.jpg',
          listed_date: new Date('2023-04-02').toISOString(),
          seller: {
            name: '李小華',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            rating: 4.7,
            reviews: 9
          }
        },
        {
          id: '3',
          title: 'Yamaha FG800 民謠吉他 (原木色)',
          price: 7000,
          description: '2020年購入的Yamaha FG800民謠吉他，狀況良好，音色渾厚。附贈吉他袋、Pick與調音器。僅在家練習使用，無明顯刮痕。',
          category: '樂器',
          location: '台中市',
          image: 'https://www.yamahamusiclondon.com/sites/ymlv5.39/productimages/900x900/FG800NT_1.jpg',
          listed_date: new Date('2023-04-03').toISOString(),
          seller: {
            name: '張大山',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            rating: 5.0,
            reviews: 12
          }
        },
        {
          id: '4',
          title: 'Nintendo Switch 主機 (紅藍手把) + 3款遊戲',
          price: 8500,
          description: 'Nintendo Switch主機，2019年版本，電池續航力加強版。附原廠配件，螢幕有貼保護貼。贈送《動物森友會》、《薩爾達傳說》與《瑪利歐賽車8》三款遊戲片。',
          category: '電子產品',
          location: '高雄市',
          image: 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/hardware/switch/nintendo-switch-neon-blue-neon-red-oled-model/gallery/image01',
          listed_date: new Date('2023-04-05').toISOString(),
          seller: {
            name: '林小玲',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
            rating: 4.8,
            reviews: 21
          }
        },
        {
          id: '5',
          title: '全新 Nike Air Jordan 1 High OG 籃球鞋 US9.5',
          price: 6200,
          description: '全新未穿過的Nike Air Jordan 1 High OG，尺寸US9.5。附原盒及吊牌，購於Nike官方網站，有購買證明。',
          category: '服裝與配件',
          location: '台北市',
          image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e19c8e4-3dbe-4f09-976d-215811578dff/air-jordan-1-mid-shoes-BxpQMJ.png',
          listed_date: new Date('2023-04-06').toISOString(),
          seller: {
            name: '王小剛',
            avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
            rating: 4.6,
            reviews: 7
          }
        },
        {
          id: '6',
          title: 'Sony A7III 全片幅無反相機 (含24-70mm鏡頭)',
          price: 48000,
          description: 'Sony A7III全片幅無反相機，機身快門數約8000，2020年購入。附Sony 24-70mm F2.8 GM鏡頭，整體狀況良好，無摔撞或進水紀錄。附原廠電池兩顆、充電器、背帶。',
          category: '電子產品',
          location: '台中市',
          image: 'https://www.sony.com.hk/image/5d02da5df552836db894cead8a68c8df?fmt=png-alpha&wid=720',
          listed_date: new Date('2023-04-08').toISOString(),
          seller: {
            name: '周小芳',
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
            rating: 5.0,
            reviews: 15
          }
        },
        {
          id: '7',
          title: '全套哈利波特英文原版書 (精裝版)',
          price: 3800,
          description: '全套七本哈利波特英文原版書，Bloomsbury出版社精裝版，書況良好，僅些微自然泛黃，無劃線註記。',
          category: '圖書與雜誌',
          location: '台南市',
          image: 'https://m.media-amazon.com/images/I/71rOzy4cyAL._AC_UF1000,1000_QL80_.jpg',
          listed_date: new Date('2023-04-10').toISOString(),
          seller: {
            name: '黃小梅',
            avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
            rating: 4.9,
            reviews: 11
          }
        },
        {
          id: '8',
          title: 'Giant TCR Advanced 2 碳纖維公路車',
          price: 42000,
          description: '2021年Giant TCR Advanced 2碳纖維公路車，size M (適合170-180cm騎士)。Shimano 105套件，騎乘不到1000公里，車況如新。因換車故出售。',
          category: '運動器材',
          location: '新北市',
          image: 'https://www.giant-bicycles.com/images/products/2022/TCR_Advanced_2_KOM_Disc_Color_A_Iris.jpg',
          listed_date: new Date('2023-04-11').toISOString(),
          seller: {
            name: '吳小豪',
            avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
            rating: 4.7,
            reviews: 14
          }
        }
      ]
    }
  },
  computed: {
    // 精選商品（推薦商品）
    featuredProducts() {
      // 从所有商品中选择前3个价格最高的商品作为精选商品
      return [...this.products]
        .sort((a, b) => b.price - a.price)
        .slice(0, 3);
    },
    
    filteredProducts() {
      let filtered = [...this.products]
      
      // 搜尋關鍵字篩選
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        )
      }
      
      // 分類篩選
      if (this.selectedCategory) {
        filtered = filtered.filter(product => product.category === this.selectedCategory)
      }
      
      // 價格範圍篩選
      if (this.selectedPrice) {
        const [min, max] = this.selectedPrice.split('-')
        if (max) {
          filtered = filtered.filter(product => 
            product.price >= Number(min) && product.price <= Number(max)
          )
        } else {
          // 處理"5000+"的情況
          filtered = filtered.filter(product => product.price >= Number(min.replace('+', '')))
        }
      }
      
      // 地區篩選
      if (this.selectedLocation) {
        filtered = filtered.filter(product => product.location === this.selectedLocation)
      }
      
      return filtered
    }
  },
  methods: {
    openProductDetails(product) {
      this.selectedProduct = product
      this.productDetailsVisible = true
    },
    formatDate(dateString) {
      if (!dateString) return 'Unknown date'
      
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now - date
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      
      if (diffDays < 1) {
        return '今天上架'
      } else if (diffDays < 2) {
        return '昨天上架'
      } else if (diffDays < 7) {
        return `${diffDays}天前上架`
      } else {
        return date.toLocaleDateString()
      }
    }
  }
}
</script>

<style scoped>
.marketplace-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.marketplace-header {
  margin-bottom: 24px;
}

.marketplace-header h1 {
  font-size: 24px;
  margin-bottom: 16px;
  color: var(--esun-green);
}

/* 精選商品樣式 */
.featured-products {
  margin-bottom: 24px;
}

.featured-title {
  font-size: 18px;
  margin-bottom: 12px;
  color: var(--esun-green);
}

.featured-carousel {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 12px;
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f1f1f1;
}

.featured-carousel::-webkit-scrollbar {
  height: 6px;
}

.featured-carousel::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.featured-carousel::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.featured-carousel::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

.featured-product-card {
  flex: 0 0 280px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s;
  background-color: white;
  cursor: pointer;
  position: relative;
}

.featured-product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.featured-product-card::after {
  content: "精選";
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--esun-green);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.featured-product-image {
  height: 180px;
  overflow: hidden;
}

.featured-product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.featured-product-card:hover .featured-product-image img {
  transform: scale(1.05);
}

.featured-product-info {
  padding: 12px;
}

.featured-product-price {
  font-size: 18px;
  font-weight: bold;
  color: var(--esun-green);
  margin-bottom: 4px;
}

.featured-product-title {
  font-size: 14px;
  color: #1c1e21;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 40px;
}

.marketplace-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.filter-section {
  flex: 1;
  min-width: 180px;
}

.search-input {
  width: 100%;
}

.category-select, .price-select, .location-select {
  width: 100%;
}

.marketplace-content {
  display: flex;
  gap: 24px;
}

.marketplace-sidebar {
  width: 240px;
  flex-shrink: 0;
}

.marketplace-sidebar h3 {
  margin-bottom: 16px;
  font-size: 18px;
  color: #1c1e21;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 4px;
  font-size: 14px;
  color: #65676b;
}

.category-list li:hover {
  background-color: #f0f2f5;
}

.category-list li.active {
  background-color: rgba(0, 117, 80, 0.1);
  color: var(--esun-green);
  font-weight: bold;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  flex: 1;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .marketplace-content {
    flex-direction: column;
  }
  
  .desktop-only {
    display: none;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-section {
    min-width: 100%;
  }
}

.product-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  background-color: white;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 12px;
}

.product-price {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
}

.product-title {
  font-size: 14px;
  margin-bottom: 6px;
  color: #1c1e21;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 40px;
}

.product-location {
  font-size: 12px;
  color: #65676b;
}

.product-location i {
  margin-right: 4px;
}

/* Product Details Dialog */
.product-detail-dialog .el-dialog__header {
  padding: 0;
  margin: 0;
}

.dialog-empty-header {
  height: 0;
}

.product-detail-dialog .el-dialog__body {
  padding: 0;
}

.product-details {
  display: flex;
  width: 100%;
}

.product-detail-left {
  flex: 1;
  max-width: 55%;
  border-right: 1px solid #e4e6eb;
}

.product-detail-right {
  flex: 1;
  max-width: 45%;
}

.product-detail-gallery {
  padding: 0;
  background-color: #f0f2f5;
  width: 100%;
}

.main-product-image {
  width: 100%;
  height: 400px;
  object-fit: contain;
  display: block;
}

.product-detail-similar {
  padding: 16px;
  border-top: 1px solid #e4e6eb;
}

.similar-title {
  font-size: 16px;
  margin-bottom: 12px;
  color: #1c1e21;
}

.similar-products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.similar-product-card {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.similar-product-image {
  height: 100px;
  overflow: hidden;
}

.similar-product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.similar-product-card:hover .similar-product-image img {
  transform: scale(1.05);
}

.similar-product-price {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 13px;
}

.product-detail-info {
  padding: 24px;
  height: 100%;
  overflow-y: auto;
}

.product-detail-price {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--esun-green);
}

.product-detail-title {
  font-size: 20px;
  margin-bottom: 16px;
  color: #1c1e21;
  line-height: 1.3;
}

.product-detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.meta-item {
  font-size: 14px;
  color: #65676b;
}

.meta-item i {
  margin-right: 6px;
}

.product-detail-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.action-button {
  flex: 1;
  height: 40px;
  font-size: 15px;
}

.action-button i {
  margin-right: 8px;
}

.product-detail-seller {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  margin-top: 24px;
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.seller-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.seller-name {
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 4px;
}

.seller-rating {
  font-size: 13px;
  color: #65676b;
}

.seller-rating i {
  color: #f7b928;
  margin-right: 4px;
}

.view-profile-button {
  color: var(--esun-green);
  font-size: 14px;
}

.view-profile-button i {
  margin-left: 4px;
  font-size: 12px;
}

.product-detail-description {
  margin-top: 24px;
}

.product-detail-description h4 {
  font-size: 16px;
  margin-bottom: 12px;
  color: #1c1e21;
}

.product-detail-description p {
  font-size: 14px;
  line-height: 1.6;
  color: #1c1e21;
  white-space: pre-line;
}

/* 移动设备样式 */
.mobile-hidden {
  display: block;
}

@media screen and (max-width: 768px) {
  .marketplace-container {
    padding: 12px;
  }
  
  .marketplace-content {
    flex-direction: column;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .product-image {
    height: 150px;
  }
  
  .product-details {
    flex-direction: column;
  }
  
  .product-detail-left, 
  .product-detail-right {
    max-width: 100%;
  }
  
  .main-product-image {
    height: 300px;
  }
  
  .mobile-hidden {
    display: none;
  }
  
  .product-detail-info {
    padding: 16px;
  }
  
  .product-detail-gallery,
  .product-detail-info {
    width: 100%;
  }
}
</style>