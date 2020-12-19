# 使用方式

`<pagination :total="total" :size.sync="size" :page.sync="current" @callback="init" ></pagination>`

```
使用说明:
1. limit，page必须加sync 修饰符
2. pagination里面可添加slot，表现为右边内容，一般做统计等。
3. callback为点击分页之后的回调，一般为拉列表
4. callback返回参数page, size, type [currentChange, sizeChange, prev, next]
4. 其他参数见elementUI文档
```
