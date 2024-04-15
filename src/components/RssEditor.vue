<template>
	<view class="container">
		<view class="page-body">
			<view class='wrapper'>
				<view class='toolbar' @tap="format" style="height: 120px;overflow-y: auto;">
					<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold">
					</view>
					<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic">
					</view>
					<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian"
						data-name="underline"></view>
					<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian"
						data-name="strike"></view>
					<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi"
						data-name="align" data-value="center"></view>
					<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi"
						data-name="align" data-value="right"></view>
					<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi"
						data-name="align" data-value="justify"></view>
					<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
					<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-icon-text_color"
						data-name="color" data-value="#0000ff"></view>

					<view :class="formats.backgroundColor === '#ff0000' ? 'ql-active' : ''"
						class="iconfont icon-fontbgcolor" data-name="backgroundColor" data-value="#ff0000"></view>
					<view class="iconfont icon-date" @tap="insertDate"></view>

					<view class="iconfont icon-checklist" data-name="list" data-value="check"></view>
					<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie"
						data-name="list" data-value="ordered"></view>
					<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie"
						data-name="list" data-value="bullet"></view>
					<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
					<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
					<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
					<view class="iconfont icon-charutupian" @tap="insertImage"></view>
					<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-formatheader1"
						data-name="header" :data-value="1"></view>
					<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao"
						data-name="script" data-value="sub"></view>
					<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao"
						data-name="script" data-value="super"></view>
          <view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-text-direction-r"
						data-name="direction" data-value="rtl"></view>
          <view class="iconfont icon-undo" @tap="undo"></view>
					<view class="iconfont icon-redo" @tap="redo"></view>
					<view class="iconfont icon-shanchu" @tap="clear"></view>
				</view>
        <!-- 一根线 -->
        <view style="width: 100%;height: 1px;background-color: #000;"></view>
				<view class="editor-wrapper">
					<editor id="editor" class="ql-container" placeholder="开始输入..." show-img-size show-img-toolbar
						show-img-resize @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
					</editor>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				readOnly: false,
				formats: {}
			}
		},
		methods: {
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				// #ifdef APP-PLUS || MP-WEIXIN || H5
				uni.createSelectorQuery().in(this).select("#editor").fields({
          context: true,
        }, res => {
          this.editorCtx = res.context;
        }).exec();
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				uni.showModal({
					title: '清空编辑器',
					content: '确定清空编辑器全部内容？',
					success: res => {
						if (res.confirm) {
							this.editorCtx.clear({
								success: function(res) {
									console.log("clear success")
								}
							})
						}
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
            // // 将图片上传到服务器
            // let imgUrl = ''
            // uni.uploadFile({
            //   url: 'http://127.0.0.1:8081/upload',
            //   filePath: res.tempFilePaths[0],
            //   name: 'file',
            //   success: (uploadFileRes) => {
            //     console.log('uploadFileRes', JSON.parse(uploadFileRes.data).data)
            //     imgUrl = JSON.parse(uploadFileRes.data).data
            //   }
            // })
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0], 
							alt: '图像',
							success: function() {
                console.log('insert image success')
							}
						})
					}
				})
			},
      // 获取编辑器内容
      getContent() {
        this.editorCtx.getContents({
          success: (res) => {
            //将数据传给父组件
            this.$emit('getcontent', res.delta)
            console.log(111);
          }
        })
      }
		}
	}
</script>

<style>
  @import "@/static/iconfont/iconfont.css";

	.page-body {
		height: calc(100vh - var(--window-top) - var(--status-bar-height));
	}

	.wrapper {
		height: 100%;
	}

	.editor-wrapper {
		height: calc(100vh - var(--window-top) - var(--status-bar-height) - 140px);
		background: #fff;
	}

	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		/* height: 24px; */
		cursor: pointer;
		font-size: 20px;
	}

	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}

	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: 100%;
		/* margin-top: 20px; */
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}
</style>
