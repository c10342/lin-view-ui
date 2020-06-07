<template>
  <div>
    <l-video-card :imageUrl="require('./assets/images/video-card.png')">
      <template>
        <div class="card-bottom">
          <p>春风得意</p>
          <p>这是一个卡片</p>
          <p>l-vue-ui</p>
        </div>
      </template>
    </l-video-card>

    <l-video-card
      cardHeight="248px"
      cardWidth="300px"
      :imageUrl="require('./assets/images/video-card.png')"
    >
      <template>
        <div class="card-bottom">
          <p>春风得意</p>
          <p>这是一个卡片</p>
          <p>l-vue-ui</p>
        </div>
      </template>
    </l-video-card>
    <l-video-card imageHeight="150px" :imageUrl="require('./assets/images/video-card.png')">
      <template>
        <div class="card-bottom">
          <p>春风得意</p>
          <p>这是一个卡片</p>
          <p>l-vue-ui</p>
        </div>
      </template>
    </l-video-card>

    <l-video-card :defaultImageUrl="require('./assets/images/logo.png')">
      <template>
        <div class="card-bottom">
          <p>春风得意</p>
          <p>这是一个卡片</p>
          <p>l-vue-ui</p>
        </div>
      </template>
    </l-video-card>
    <l-video-card
      coverTip="小提示"
      :imageUrl="require('./assets/images/video-card.png')"
      :defaultImageUrl="require('./assets/images/logo.png')"
    >
      <template>
        <div class="card-bottom">
          <p>春风得意</p>
          <p>这是一个卡片</p>
          <p>l-vue-ui</p>
        </div>
      </template>
    </l-video-card>
    <l-video-card errorTip="图片加载失败">
      <template>
        <div class="card-bottom">
          <p>春风得意</p>
          <p>这是一个卡片</p>
          <p>l-vue-ui</p>
        </div>
      </template>
    </l-video-card>
  </div>
</template>

<style lang="scss" scoped>
.card-bottom {
  height: 102px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > p {
    font-size: 12px;
    font-weight: 400;
    color: #666;
    margin: 0;
    &:nth-child(1) {
      font-size: 14px;
      font-weight: 400;
      color: #333;
    }
  }
}
</style>