<template>
  <view class="content">
    <view class="reseach">
      <!-- 这里放一个搜索框 -->
      <RssSearch></RssSearch>

    </view>

    <view class="liked">
      <!-- 这里放一个猜你喜欢模块 -->
      <view>热门资源</view>
      <uni-card padding="10px 0" >
				<text class="uni-body uni-mt-5">资源描述</text>
				<view class="card-actions">
					<view class="card-actions-item" @click="actionsClick('分享')">
						<uni-icons type="pengyouquan" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">分享</text>
					</view>
					<view class="card-actions-item" @click="actionsClick('点赞')">
						<uni-icons type="heart" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">点赞</text>
					</view>
					<view class="card-actions-item" @click="actionsClick('评论')">
						<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">评论</text>
					</view>
				</view>
			</uni-card>


    </view>

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello')
const actionsClick = (text: string) => {
  uni.showToast({
    title: text,
    icon: 'success'
  })
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.liked {
  padding: 20px;
  border: 1px solid #000;
  .card-actions {
    display: flex;
    justify-content: space-between;
  }
}

</style>
