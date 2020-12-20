## dialog 以及 modal 组件

### dialog

1. 使用方式和 `el-dailog` 一致，可传参数除`width`外，增加了 `loading` 参数（适用于调用接口）
2. 目前弹框组件比较简单，暂不支持关闭的回调等等，后续有需要可以添加
3. 传`visible`参数时，需添加 `.sync`, 在`dialog`组件内调用右上角 x 以及取消事件时，会默认关闭弹框
4. 默认的 `footer` 为， 取消 和 确认 按钮，取消会派发 `cancel` 事件到父级，确认会派发 `submit`
5. 如不使用默认 `footer`，可使用 `v-slot:footer` 来插入
6. `title` 插槽使用 `title`，如不使用插槽，只传 `string` 也可以正常显示
7. 内容插槽 为 `content`
8. `dialog` 组件按照 `ui` 标准重置了样式， `footer` 可以只传入按钮，不需要考虑`margin`，`dialog`组件会处理
9. `dialog` 组件 ui 标准 宽度为 `600px`

### modal

1. 子项目调用时使用 `window.parent.webapp.$store.commit('changeModalVisible', type)` 来控制显示隐藏，`type` 为 `Boolean`
2. 关于`modal`样式，目前默认兼容的 `zl-saas` 弹框样式 ， `zl-saas` 和 `elementui` 样式分别如下

   ```css
   /* zl-saas */
   .modal: {
     opacity: 0.8;
     background-color: "#3a3f51";
   }

   /* element */
   .modal: {
     opacity: 0.5;
     background-color: "#000000";
   }
   ```

3. 默认`modal`弹框 `zIndex` 为 `1000`， 可修改
4. 修改方式 `window.parent.webapp.$store.commit('setModalStyle', style)` , `style` 为 `css` 对象写法

   ```js
   {
       opacity: 0.5,
       backgroundColor: '#000000',
       zIndex: 1000
     }
   ```

5. modal 添加了 transition 过渡效果，过渡适用于 `opacity`，默认时间 0.15s, 线性，暂不可修改
