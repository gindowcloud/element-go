<template>
  <el-container>
    <el-header>
      <div class="logo"><router-link to="/">Element Go</router-link></div>
      <div class="subject"><el-tag effect="plain">基于 Element Plus 扩展的常用业务组件</el-tag></div>
    </el-header>
    <el-container class="content">
      <el-aside width="200px">
        <el-menu router>
          <el-menu-item index="/components/page-header">PageHeader 页头</el-menu-item>
          <el-menu-item index="/components/form-search">FormSearch 搜索</el-menu-item>
          <el-menu-item index="/components/table">Table 表格</el-menu-item>
          <el-menu-item index="/components/loading">Loading 加载</el-menu-item>
          <el-menu-item index="/components/pagination">Pagination 分页</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="page">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ElContainer, ElHeader, ElAside, ElMain, ElTag, ElMenu, ElLink, ElMenuItem } from 'element-plus'
</script>

<style>
.el-header { display: flex; align-items: center; border-bottom: 1px solid #eee; }
.el-header .logo { width: 180px; text-align: center; font-size: 24px; }
.el-header .logo a { text-decoration: none; color: #000; }
.el-header .subject {  margin-left: 20px; }
.el-aside { background-color: #f9f9f9; border-right: 1px solid #eee; }
.el-aside .el-menu { background: transparent; border-right: none; min-height: calc(100vh - 60px); }
.el-main { padding: 40px !important; }
</style>
