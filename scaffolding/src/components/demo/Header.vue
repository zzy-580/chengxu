<template>
  <div>
      <mt-header title="学前端,到学问" fixed>
          <router-link to="/" slot="left">
              <mt-button icon="back"></mt-button>
          </router-link>
          <router-link to="/" slot="right">
              <mt-button icon="more"></mt-button>
          </router-link>
      </mt-header>    
      <div style="border:2px solid #f00;margin-top:40px;">
          <p>
            <mt-button type="default">默认的</mt-button>
          </p>
          <p>
            <mt-button type="primary">主要的</mt-button>
          </p>
          <p>
            <mt-button type="danger">危险的</mt-button>
          </p>
          <p>
            <mt-button type="primary" size="small">主要的(小的)</mt-button>
          </p>
          <p>
            <mt-button type="primary" size="normal">主要的(默认的)</mt-button>
          </p>
          <p>
            <mt-button type="primary" size="large">主要的(大的)</mt-button>
          </p>
          <p>
            <mt-button type="danger" plain>镂空按钮</mt-button>
          </p>
          <p>
            <mt-button type="primary">
                <img src="../../assets/more.png" slot="icon">更多
            </mt-button>
          </p>
          <p v-for="(v,k) of 30" :key="k">{{v}}</p>
      </div>
  </div>
</template>