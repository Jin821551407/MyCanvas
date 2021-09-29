
new Vue({
    el:"#app",
    data() {
        return {
            color:'black',
            sizeIndex:1,
            touch:false,
            size:1,
            lastPoint:{x:undefined,y:undefined},
            canvas:null,
            ctx:null,
            statusImg:null
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
            ctx = canvas.getContext("2d");
            //设置线条颜色
            ctx.strokeStyle  = this.color
            //设置线条端头样式
            ctx.lineCap='round'
            this.canvas = canvas
            this.ctx = ctx
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
                this.statusImg = this.ctx.getImageData(0,0,this.canvasWidth,this.canvasHeight)
                return
            }
            // console.log(event.touches.length===2);
            if(event.touches.length===2){
                this.ctx.putImageData(this.statusImg,0,0)
                // this.touch=true
                return
            }
        },
        drawEnd(){
            // this.touch=false
            // // console.log(this.touch)
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
        }
    }
})