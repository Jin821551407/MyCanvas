
new Vue({
    el:"#app",
    data() {
        return {
            color:'black', //当前画笔颜色
            sizeIndex:1, //当前画笔的粗细 1 2 3
            touch:false, //是否有手指触摸屏幕
            size:1, //画笔的粗细 1 2 3
            lastPoint:{x:undefined,y:undefined}, //画笔结束点
            canvas:null, //canvas对象
            ctx:null, //2D绘制环境
            historyStatus:[], //画板状态保存数组
            historyIndex:0, //当前画板状态是历史数组的第几项
        }
    },
    mounted() {
        this.setCanvasSize()
    },
    methods: {
        setCanvasSize(){
            // console.dir(this.$refs.canvasCantainer.clientWidth);
            // 获取canvas
            const canvas = this.$refs.canvas
            this.canvasWidth = this.$refs.canvasCantainer.clientWidth
            this.canvasHeight = this.$refs.canvasCantainer.clientHeight
            canvas.width = this.canvasWidth
            canvas.height = this.canvasHeight
            // 开启2d的绘制环境
            ctx = canvas.getContext("2d")
            //设置线条颜色
            ctx.strokeStyle  = this.color
            //设置线条端头样式
            ctx.lineCap='round'
            this.canvas = canvas
            this.ctx = ctx
            //记录初始画布的状态
            const statusImg = this.ctx.getImageData(0,0,this.canvasWidth,this.canvasHeight)
            this.historyStatus.push(statusImg)
        },
        chooseColor(color){
            // console.log(111);
            this.color=color
            this.ctx.strokeStyle  = this.color
        },
        changeSizeIndex(sizeIndex){
            this.sizeIndex=sizeIndex
            this.size=sizeIndex
        },
        drawStart(event){
            if(event.touches.length===1){
                return
            }
            if(event.touches.length===2){
                this.withdraw()
                return
            }
            if(event.touches.length===3){
                this.forward()
                return
            }
        },
        drawEnd(){
            const statusImg = this.ctx.getImageData(0,0,this.canvasWidth,this.canvasHeight)
            const deleteCount = this.historyStatus.length - this.historyIndex -1
            this.historyIndex += 1
            this.historyStatus.splice(this.historyIndex,deleteCount,statusImg)
            this.lastPoint={x:undefined,y:undefined}
        },
        drawCanvas(event){
            // 当手指滑动时
            // 绘制线条
            let newPoint= {x:event.targetTouches[0].pageX, y:event.targetTouches[0].pageY}
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
            this.ctx.lineWidth = this.size*1.5
            this.ctx.lineTo(newPoint.x, newPoint.y);
            this.ctx.stroke();
            this.ctx.closePath();
            this.lastPoint = newPoint
        },
        clear(){
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        },
        //撤销画板操作
        withdraw(){
            //退回到数组0项就不能再后退了
            if(this.historyIndex>0){
                this.historyIndex -= 1
                this.ctx.putImageData(this.historyStatus[this.historyIndex],0,0)
            }
        },
        //前进画板操作
        forward(){
            if(this.historyIndex<this.historyStatus.length-1){
                this.historyIndex += 1
                this.ctx.putImageData(this.historyStatus[this.historyIndex],0,0)
            }
        }
    }
})