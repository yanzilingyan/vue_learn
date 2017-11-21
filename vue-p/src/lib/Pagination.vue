<template>
    <div class="clearfix box_pagination">
      <div class="laypage_l">
        <label>第&nbsp;</label>
        <label>{{ current }}</label><label>/{{ pagegroup }}&nbsp;页，共{{ total }}条，每页显示{{ display }}条</label>
      </div>
      <div class="laypage_r">
        <ul class="pagination">
          <li :class="{'disabled': current == 1}" v-show="isShowFirst"><a href="javascript:;" class="single" @click="setCurrent(1)"> 首页 </a></li>
          <li :class="{'disabled': current == 1}" v-show="isShowPrev"><a href="javascript:;" class="prev" @click="setCurrent(current - 1)"> 上一页 </a></li>
          <li v-for="p in showPages" :class="{'active': current == p.val}">
            <a href="javascript:;" @click="setCurrent(p.val)" v-if="p.text==='...'" class="noBorder">{{ p.text }}</a>
            <a href="javascript:;" @click="setCurrent(p.val)" v-else> {{ p.text }} </a>
          </li>
          <li :class="{'disabled': current == page}" v-show="isShowNext"><a href="javascript:;" class="next" @click="setCurrent(current + 1)"> 下一页 </a></li>
          <li :class="{'disabled': current == page}" v-show="isShowLast"><a href="javascript:;" class="single" @click="setCurrent(page)"> 尾页 </a></li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default{
    data(){
      return {
        current: this.currentPage,
        showPages: [],
        isShowFirst: false,
        isShowPrev: false,
        isShowNext: true,
        isShowLast: true
      }
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      display: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 1,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.display);
      }
    },
    methods: {
      getPagesList() {
        let self= this;
        let len = self.page, temp = [];
        if(len <= 5) {  // 当页数小于5
          while (len--) {
            temp.push({text: self.page - len, val: self.page - len});
          }
        } else {
          for(let i=0;i<5;i++) {
            len--;
            temp.push({text: self.page - len, val: self.page - len});
          }
          temp.push({text: '...', val: 6});
        }
        self.showPages = temp;
      },
      setCurrent: function (idx) {
        let self = this;
        if(self.current != idx && idx > 0 && idx < self.page + 1) {
          self.current = idx;
          if(idx === 1) {
            self.isShowFirst = false;
            self.isShowPrev = false;
            self.isShowNext = true;
            self.isShowLast = true;
          } else if (idx == self.page) {
            self.isShowFirst = true;
            self.isShowPrev = true;
            self.isShowNext = false;
            self.isShowLast = false;
          } else {
            self.isShowFirst = true;
            self.isShowPrev = true;
            self.isShowNext = true;
            self.isShowLast = true;
          }
          if(idx > 5) {
            let temp_arry = [], start = idx - 2, end = idx + 2;
            if(end>=self.page) {
              start = idx - (5 - (self.page-idx) - 1);
              end = self.page;
            }
            temp_arry.push({text: '...', val: idx - 3});
            for(let i=start;i<=end;i++) {
              temp_arry.push({text: i, val: i});
            }
            if(idx < (self.page-5/2)) {
              temp_arry.push({text: '...', val: idx + 3});
            }
            self.showPages = temp_arry;
          } else {
            let temp_arry = [];
            for(let i=1;i<=idx;i++) {
              temp_arry.push({text: i, val: i});
            }
            if(idx === 5) {
              temp_arry.push({text: '...', val: idx + 1});
            }
            self.showPages = temp_arry;
          }
          this.$emit('pagechange', this.current);
        }
      }
    },
    mounted() {
      this.getPagesList();
    },
  }
</script>
<style>
  .box_pagination {
    padding: 20px 0px;
  }
  .laypage_l {
    float: left;
    width: 30%;
  }
  .laypage_l label {
    color: #999;
  }
  .laypage_r {
    float: right;
    width: 70%;
  }
  .pagination {
    overflow: hidden;
    margin: 0 auto;
    height: 50px;
    text-align: right;
  }
  .pagination li {
    display: inline-block;
    height: 34px;
    margin: 0px 3px;
    color: #666;
  }
  .pagination li .noBorder {
    border: none;
  }
  .pagination li:hover {
  }
  .pagination li:hover a {
    color: #25aae1;
    background: #ebfaff;
  }
  .pagination li a {
    display: block;
    width: 34px;
    height: 34px;
    color: #333;
    text-align: center;
    line-height: 32px;
    font-size: 14px;
    text-decoration: none;
    border: 2px solid #ddd;
    background-color: #f9fbfc;
  }
  .pagination li a.single {
    width: 54px;
  }
  .pagination li a.prev {
    width: 68px;
  }
  .pagination li a.next {
    width: 68px;
  }
  .pagination .active a {
    color: #25aae1;
    background: #ebfaff;
    border: 2px solid #b8dbea;
  }
</style>
