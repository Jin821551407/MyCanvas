
new Vue({
    el:"#app",
    data() {
        return {
            color:'black',
            sizeIndex:1,
            touch:false,
            size:1,
            lastPoint:{x:undefined,y:undefined}
        }
    },
    mounted() {
        this.setCanvasSize()
    },
    methods: {
        setCanvasSize(){
            console.dir(this.$refs.canvasCantainer.clientWidth);
            // 获取canvas
            const canvas = this.$refs.canvas
            canvas.width = this.$refs.canvasCantainer.clientWidth
            canvas.height = this.$refs.canvasCantainer.clientHeight
        },
        chooseColor(color){
            console.log(111);
            this.color=color
        },
        changeSizeIndex(sizeIndex){
            this.sizeIndex=sizeIndex
            this.size=sizeIndex
        },
        drawStart(){
            this.touch=true
            console.log(this.touch)
        },
        drawEnd(){
            this.touch=false
            console.log(this.touch)
            this.lastPoint={x:undefined,y:undefined}
        },
        drawCanvas(event){
            // 当鼠标按下时
            if(this.touch===true){
                // 获取canvas
                const canvas = this.$refs.canvas
                // 开启2d的绘制环境
                ctx = canvas.getContext("2d");
                // 绘制线条
                let newPoint= {x:event.targetTouches[0].pageX, y:event.targetTouches[0].pageY}
                ctx.beginPath();
                ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
                ctx.lineWidth = this.size*1.5
                ctx.strokeStyle  = this.color;
                ctx.lineCap='round'
                ctx.lineTo(newPoint.x, newPoint.y);
                ctx.stroke();
                ctx.closePath();
                this.lastPoint = newPoint
            }
        },
        // clear(){
        //     // 获取canvas
        //     const canvas = this.$refs.canvas;
        //     // 开启2d的绘制环境
        //     const ctx = canvas.getContext("2d");
        //     ctx.clearRect(0, 0, 1200, 600);
        // }
    }
})